-- Add missing columns and tables

-- Add missing columns to catechumenes
ALTER TABLE public.catechumenes 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS telephone TEXT,
ADD COLUMN IF NOT EXISTS parent_nom TEXT,
ADD COLUMN IF NOT EXISTS parent_telephone TEXT,
ADD COLUMN IF NOT EXISTS statut TEXT DEFAULT 'actif',
ADD COLUMN IF NOT EXISTS numero_ndi TEXT;

-- Add missing columns to documents
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS titre TEXT;

UPDATE public.documents SET titre = 'Document sans titre' WHERE titre IS NULL;
ALTER TABLE public.documents ALTER COLUMN titre SET NOT NULL;

-- Create intentions_messe table
CREATE TABLE IF NOT EXISTS public.intentions_messe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT,
  telephone TEXT,
  intention TEXT NOT NULL,
  date_demandee DATE,
  statut TEXT DEFAULT 'en_attente',
  montant DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.intentions_messe ENABLE ROW LEVEL SECURITY;

-- Public can submit intentions
CREATE POLICY "Anyone can submit mass intentions" ON public.intentions_messe 
  FOR INSERT WITH CHECK (true);

-- Trigger for intentions_messe
CREATE TRIGGER set_updated_at_intentions BEFORE UPDATE ON public.intentions_messe
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add time columns to liturgical events if needed  
ALTER TABLE public.evenements_liturgiques
ADD COLUMN IF NOT EXISTS heure_debut TIME,
ADD COLUMN IF NOT EXISTS heure_fin TIME;