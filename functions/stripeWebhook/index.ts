
import { createClient } from 'npm:@lumi.new/sdk'
import Stripe from 'npm:stripe@^14.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || "";

export default async function handler(req: Request): Promise<Response> {
  const authorization = req.headers.get('Authorization');
  const lumi = createClient({
    projectId: Deno.env.get("PROJECT_ID")!,
    apiBaseUrl: Deno.env.get("API_BASE_URL")!,
    authOrigin: Deno.env.get("AUTH_ORIGIN")!,
    authorization,
  });

  const signature = req.headers.get('stripe-signature');
  
  // Verify Webhook Secret
  if (!endpointSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      // In production, we might want to fail, but for initial setup without secret, we might skip
      // But Stripe requires verification for security.
      // If we don't have it yet, we can't verify.
      return new Response("Webhook Secret Missing", { status: 500 });
  }

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature!, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const planId = session.metadata?.plan_id || 'premium_unknown';

    if (email) {
       console.log(`Processing payment for ${email}`);
       
       // Generate 8-char Alphanumeric Code (uppercase)
       const accessCode = Math.random().toString(36).substring(2, 10).toUpperCase();

       try {
           // 1. Store in MongoDB
           await lumi.entities.access_codes.create({
               code: accessCode,
               email: email,
               planId: planId,
               status: 'active',
               createdAt: new Date().toISOString()
           });
           console.log(`Access code created for ${email}`);

           // 2. Send Email
           await lumi.tools.email.send({
               to: email,
               subject: "Votre code d'accès Body Titan",
               html: `
                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1f2937; color: #ffffff; padding: 20px; border-radius: 10px;">
                    <h1 style="color: #ef4444; text-align: center;">Bienvenue chez Body Titan !</h1>
                    <p style="font-size: 16px;">Bonjour,</p>
                    <p style="font-size: 16px;">Votre paiement a été validé avec succès. Merci de votre confiance !</p>
                    
                    <div style="background-color: #111827; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; border: 1px solid #ef4444;">
                        <p style="margin: 0; color: #9ca3af; font-size: 14px;">Votre code d'accès personnel :</p>
                        <h2 style="color: #ffffff; font-size: 32px; margin: 10px 0; letter-spacing: 2px;">${accessCode}</h2>
                    </div>

                    <p style="font-size: 14px; color: #d1d5db;">Utilisez ce code pour déverrouiller l'application. Ce code est strictement personnel.</p>
                    <p style="font-size: 14px; color: #d1d5db;">Sportivement,<br/><strong style="color: #ef4444;">TitanGryx</strong></p>
                 </div>
               `
           });
           console.log(`Email sent to ${email}`);

       } catch (e) {
           console.error("Error in webhook processing:", e);
           return new Response("Internal Server Error", { status: 500 });
       }
    }
  }

  return new Response("Received", { status: 200 });
}