
import { createClient } from 'npm:@lumi.new/sdk'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
      const { code } = await req.json();
      const adminCode = "TitanGryx2024";

      // 1. Check Admin Code
      if (code && code.trim() === adminCode) {
          return new Response(JSON.stringify({ valid: true, planId: 'admin', type: 'admin' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }

      // 2. Check Client Codes via Database
      const authorization = req.headers.get('Authorization');
      // Initialize SDK
      // Note: We need a server-side client. If the request comes from frontend, it might not have an authorized user session
      // that allows reading the DB if RLS is strict. 
      // But Deno functions have admin access via LUMI_API_KEY injected? 
      // Actually, 'authorization' header passed from client identifies the user.
      // If the user isn't logged in (which they aren't, they just have a code), we need a Service Role or similar?
      // Deno environment has `LUMI_API_KEY` which gives full access? 
      // No, `createClient` with just `projectId` usually uses the `authorization` header.
      // If we don't pass `authorization`, we are anonymous.
      // Anonymous users might not have read access to `access_codes` collection unless we allow it.
      // BUT, this is a server-side function. We can likely use a "system" client if we had a secret key.
      // However, for this use case, we can assume the Deno environment has privileges or the collection is readable?
      // Actually, better approach: The function itself runs in a secure environment. 
      // We should check if we can query the DB. 
      // Let's rely on standard client for now. If it fails due to permissions, we'll need to adjust RBAC.
      
      const lumi = createClient({
        projectId: Deno.env.get("PROJECT_ID")!,
        apiBaseUrl: Deno.env.get("API_BASE_URL")!,
        authOrigin: Deno.env.get("AUTH_ORIGIN")!,
        authorization, 
      });

      const { list } = await lumi.entities.access_codes.list({
          filter: { code: code.trim().toUpperCase(), status: 'active' },
          limit: 1
      });

      if (list.length > 0) {
          return new Response(JSON.stringify({ valid: true, planId: list[0].planId, type: 'client' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }

      return new Response(JSON.stringify({ valid: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

  } catch (error) {
      console.error("Verification error:", error);
      return new Response(JSON.stringify({ error: "Verification failed" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
  }
}