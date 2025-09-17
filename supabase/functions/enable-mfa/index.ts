import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface MFARequest {
  action: 'enroll' | 'verify' | 'unenroll';
  factorId?: string;
  code?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user from JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { action, factorId, code }: MFARequest = await req.json();

    switch (action) {
      case 'enroll': {
        // Start MFA enrollment
        const { data, error } = await supabase.auth.mfa.enroll({
          factorType: 'totp',
          issuer: 'Notre-Dame Paroisse',
        });

        if (error) {
          throw error;
        }

        return new Response(JSON.stringify({
          success: true,
          data: {
            id: data.id,
            qr_code: data.qr_code,
            secret: data.secret,
            uri: data.uri
          }
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case 'verify': {
        if (!factorId || !code) {
          throw new Error("Factor ID and code required for verification");
        }

        // Verify the TOTP code
        const { data, error } = await supabase.auth.mfa.verify({
          factorId,
          challengeId: factorId, // Using factorId as challengeId for simplicity
          code,
        });

        if (error) {
          throw error;
        }

        return new Response(JSON.stringify({
          success: true,
          message: "MFA enabled successfully",
          data
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case 'unenroll': {
        if (!factorId) {
          throw new Error("Factor ID required for unenrollment");
        }

        // Remove MFA factor
        const { error } = await supabase.auth.mfa.unenroll({
          factorId
        });

        if (error) {
          throw error;
        }

        return new Response(JSON.stringify({
          success: true,
          message: "MFA disabled successfully"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error("Invalid action");
    }

  } catch (error: any) {
    console.error("Error in enable-mfa function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);