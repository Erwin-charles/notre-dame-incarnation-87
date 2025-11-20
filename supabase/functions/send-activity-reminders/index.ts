import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Inscription {
  id: string;
  activite_titre: string;
  activite_type: string | null;
  activite_date: string | null;
  activite_lieu: string | null;
  user_id: string;
  rappel_envoye: boolean;
}

interface Profile {
  email: string | null;
  nom: string | null;
  prenom: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting activity reminder check...");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate date range (24-48 hours from now)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(tomorrow.getHours() + 24);
    const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setHours(dayAfterTomorrow.getHours() + 48);

    console.log(`Checking for activities between ${tomorrow.toISOString()} and ${dayAfterTomorrow.toISOString()}`);

    // Fetch confirmed inscriptions for activities in the next 24-48 hours that haven't received a reminder
    const { data: inscriptions, error: inscriptionsError } = await supabase
      .from("inscriptions_activites")
      .select("*")
      .eq("statut", "confirme")
      .eq("rappel_envoye", false)
      .not("activite_date", "is", null)
      .gte("activite_date", tomorrow.toISOString())
      .lte("activite_date", dayAfterTomorrow.toISOString());

    if (inscriptionsError) {
      console.error("Error fetching inscriptions:", inscriptionsError);
      throw inscriptionsError;
    }

    if (!inscriptions || inscriptions.length === 0) {
      console.log("No inscriptions found requiring reminders");
      return new Response(
        JSON.stringify({ message: "No reminders to send", count: 0 }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${inscriptions.length} inscriptions requiring reminders`);

    let successCount = 0;
    let errorCount = 0;

    // Process each inscription
    for (const inscription of inscriptions as Inscription[]) {
      try {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email, nom, prenom")
          .eq("id", inscription.user_id)
          .single();

        if (profileError || !profile) {
          console.error(`Error fetching profile for user ${inscription.user_id}:`, profileError);
          errorCount++;
          continue;
        }

        const userProfile = profile as Profile;

        if (!userProfile.email) {
          console.log(`No email found for user ${inscription.user_id}`);
          errorCount++;
          continue;
        }

        // Format activity date
        const activityDate = inscription.activite_date 
          ? new Date(inscription.activite_date).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Date à confirmer";

        // Send reminder email
        const emailResponse = await resend.emails.send({
          from: "Paroisse <onboarding@resend.dev>",
          to: [userProfile.email],
          subject: `Rappel : ${inscription.activite_titre} bientôt !`,
          html: `
            <h1>Rappel de votre activité</h1>
            <p>Bonjour ${userProfile.prenom || ""} ${userProfile.nom || ""},</p>
            <p>Nous vous rappelons votre inscription à l'activité suivante :</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">${inscription.activite_titre}</h2>
              ${inscription.activite_type ? `<p><strong>Type :</strong> ${inscription.activite_type}</p>` : ""}
              <p><strong>Date :</strong> ${activityDate}</p>
              ${inscription.activite_lieu ? `<p><strong>Lieu :</strong> ${inscription.activite_lieu}</p>` : ""}
            </div>
            <p>Nous vous attendons avec impatience !</p>
            <p>Si vous ne pouvez plus participer, merci de nous en informer dès que possible.</p>
            <p>Cordialement,<br>L'équipe de la Paroisse</p>
          `,
        });

        console.log(`Email sent to ${userProfile.email} for activity "${inscription.activite_titre}"`);

        // Update inscription to mark reminder as sent
        const { error: updateError } = await supabase
          .from("inscriptions_activites")
          .update({
            rappel_envoye: true,
            date_rappel: new Date().toISOString(),
          })
          .eq("id", inscription.id);

        if (updateError) {
          console.error(`Error updating inscription ${inscription.id}:`, updateError);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (error) {
        console.error(`Error processing inscription ${inscription.id}:`, error);
        errorCount++;
      }
    }

    console.log(`Reminder process completed. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        message: "Reminder process completed",
        total: inscriptions.length,
        success: successCount,
        errors: errorCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-activity-reminders function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
