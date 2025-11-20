-- Add reminder tracking columns to inscriptions_activites
ALTER TABLE public.inscriptions_activites 
ADD COLUMN IF NOT EXISTS rappel_envoye boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS date_rappel timestamp with time zone;

-- Add index for performance when querying upcoming activities
CREATE INDEX IF NOT EXISTS idx_inscriptions_activites_date_rappel 
ON public.inscriptions_activites(activite_date, rappel_envoye) 
WHERE statut = 'confirme' AND rappel_envoye = false;

-- Add comment
COMMENT ON COLUMN public.inscriptions_activites.rappel_envoye IS 'Indique si un rappel a été envoyé pour cette inscription';
COMMENT ON COLUMN public.inscriptions_activites.date_rappel IS 'Date et heure de l envoi du rappel';