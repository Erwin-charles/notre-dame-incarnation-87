import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  nom: string;
  prenom: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, nom, prenom }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Notre-Dame <noreply@resend.dev>",
      to: [email],
      subject: "Bienvenue dans notre communauté paroissiale !",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px;">✝️ Notre-Dame</h1>
              <p style="color: #64748b; margin: 10px 0 0 0;">Paroisse Catholique</p>
            </div>
            
            <h2 style="color: #1e293b; margin-bottom: 20px;">Bienvenue ${prenom} ${nom} !</h2>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Nous sommes ravis de vous accueillir dans notre communauté paroissiale. 
              Votre compte a été créé avec succès et vous pouvez désormais accéder à tous nos services en ligne.
            </p>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Services disponibles :</h3>
              <ul style="color: #475569; line-height: 1.8;">
                <li>📅 Calendrier liturgique et événements</li>
                <li>📚 Catéchèse et formation</li>
                <li>💒 Intentions de messe</li>
                <li>🤝 Activités paroissiales</li>
                <li>📄 Documents et ressources spirituelles</li>
                <li>💌 Newsletter paroissiale</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${Deno.env.get('SUPABASE_URL') || 'https://selqetkcyvcynyvnfpkc.supabase.co'}" 
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Accéder à mon compte
              </a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Que la paix du Seigneur soit avec vous !<br>
                <strong>L'équipe paroissiale Notre-Dame</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Cet email a été envoyé automatiquement. Merci de ne pas y répondre.<br>
                Si vous avez des questions, contactez-nous via le formulaire de contact du site.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      throw emailResponse.error;
    }

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email de bienvenue envoyé avec succès",
      data: emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Erreur lors de l'envoi de l'email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);