import Stripe from 'npm:stripe@^14.0.0'
import { Buffer } from "node:buffer";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

async function getPayPalAccessToken() {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  
  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials missing");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  // Default to Live, but fallback to Sandbox if needed could be implemented. 
  // For now, we assume Live as this is a production app request.
  // Use 'https://api-m.paypal.com' for Live, 'https://api-m.sandbox.paypal.com' for Sandbox
  const baseUrl = "https://api-m.paypal.com"; 
  
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  
  if (!response.ok) {
    // Fallback to sandbox if live fails (common in dev)
    const sandboxUrl = "https://api-m.sandbox.paypal.com";
    console.log("Live PayPal auth failed, trying Sandbox...");
    const sandboxResponse = await fetch(`${sandboxUrl}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (!sandboxResponse.ok) {
        const errorText = await sandboxResponse.text();
        throw new Error(`PayPal Auth Failed: ${errorText}`);
    }
    
    const data = await sandboxResponse.json();
    return { accessToken: data.access_token, baseUrl: sandboxUrl };
  }
  
  const data = await response.json();
  return { accessToken: data.access_token, baseUrl };
}

async function handler(req: Request): Promise<Response> {
  console.log("[DEBUG] Request received:", req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json();
    console.log("[DEBUG] Payload:", JSON.stringify(body));
    const { planId, userId, returnUrl, provider = 'stripe' } = body;

    // Debug credentials presence
    console.log("[DEBUG] Checking credentials...");
    console.log("PAYPAL_CLIENT_ID exists:", !!Deno.env.get("PAYPAL_CLIENT_ID"));
    console.log("PAYPAL_CLIENT_SECRET exists:", !!Deno.env.get("PAYPAL_CLIENT_SECRET"));
    console.log("STRIPE_SECRET_KEY exists:", !!Deno.env.get("STRIPE_SECRET_KEY"));

    if (!planId || !userId) {
      return new Response(JSON.stringify({ error: 'Missing planId or userId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let priceData = {}
    let mode = 'subscription'
    let trial_period_days = undefined
    
    // Map for Stripe
    const planDetails: any = {
        'premium_app_monthly': {
            stripe: { unit_amount: 699, interval: 'month', name: 'Premium App Mensuel' },
            paypal: { value: "6.99", name: 'Premium App Mensuel' },
            trial: 7
        },
        'premium_app_yearly': {
            stripe: { unit_amount: 4900, interval: 'year', name: 'Premium App Annuel' },
            paypal: { value: "49.00", name: 'Premium App Annuel' },
            trial: 7
        },
        'seance_individuelle': {
            stripe: { unit_amount: 3000, interval: null, name: 'Séance Individuelle' },
            paypal: { value: "30.00", name: 'Séance Individuelle' },
            trial: null,
            mode: 'payment'
        }
    };

    const plan = planDetails[planId];
    if (!plan) throw new Error('Invalid plan ID');

    if (provider === 'paypal') {
        // PayPal Flow
        const { accessToken, baseUrl } = await getPayPalAccessToken();
        
        const orderPayload = {
            intent: "CAPTURE",
            purchase_units: [{
                reference_id: planId,
                amount: {
                    currency_code: "EUR",
                    value: plan.paypal.value
                },
                description: plan.paypal.name
            }],
            application_context: {
                brand_name: "Body Titan Fitness",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `${returnUrl}?success=true&plan_id=${planId}&provider=paypal`,
                cancel_url: `${returnUrl}?canceled=true`
            }
        };

        const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(orderPayload)
        });

        if (!orderRes.ok) {
             const errText = await orderRes.text();
             throw new Error(`PayPal Order Creation Failed: ${errText}`);
        }

        const orderData = await orderRes.json();
        const approveLink = orderData.links.find((link: any) => link.rel === "approve");

        if (!approveLink) throw new Error("No approve link found in PayPal response");

        return new Response(JSON.stringify({ url: approveLink.href }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } else {
        // Stripe Flow
        const p = plan.stripe;
        priceData = {
            currency: 'eur',
            product_data: { name: p.name },
            unit_amount: p.unit_amount,
        };
        
        if (p.interval) {
            (priceData as any).recurring = { interval: p.interval };
        }

        const sessionConfig: any = {
            payment_method_types: ['card'],
            mode: plan.mode || 'subscription',
            metadata: {
                plan_id: planId,
                user_id: userId
            },
            line_items: [
                {
                    price_data: priceData,
                    quantity: 1,
                },
            ],
            success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}`,
            cancel_url: `${returnUrl}?canceled=true`,
            client_reference_id: userId,
        }

        if (plan.trial && !plan.mode) { // Only add trial for subscriptions
            sessionConfig.subscription_data = {
                trial_period_days: plan.trial,
            }
        }

        const session = await stripe.checkout.sessions.create(sessionConfig)

        return new Response(JSON.stringify({ url: session.url }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

  } catch (error: any) {
    console.error("Payment Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}

await Deno.serve(handler)