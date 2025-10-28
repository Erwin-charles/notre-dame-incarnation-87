-- Create tables for parish information

-- Permanences des Pères
CREATE TABLE public.permanences_peres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jour TEXT NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME,
  pretre TEXT NOT NULL,
  type_permanence TEXT NOT NULL, -- 'messe' ou 'permanence'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Horaires secrétariat
CREATE TABLE public.horaires_secretariat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jour TEXT NOT NULL,
  heure_ouverture TIME NOT NULL,
  heure_fermeture TIME,
  pause_debut TIME,
  pause_fin TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sacrements information
CREATE TABLE public.sacrements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type_sacrement TEXT NOT NULL, -- 'bapteme', 'mariage', 'funerailles'
  titre TEXT NOT NULL,
  description TEXT,
  horaires TEXT,
  pieces_requises TEXT[],
  tarifs TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activities table (if not exists)
CREATE TABLE IF NOT EXISTS public.activites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  date_activite TIMESTAMP WITH TIME ZONE,
  lieu TEXT,
  organisateur TEXT,
  statut TEXT DEFAULT 'planifie',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events table (if not exists)
CREATE TABLE IF NOT EXISTS public.evenements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
  date_fin TIMESTAMP WITH TIME ZONE,
  lieu TEXT,
  type_evenement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Documents table (if not exists)
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  type_document TEXT,
  categorie TEXT,
  statut TEXT DEFAULT 'brouillon',
  approuve_par UUID,
  date_approbation TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_abonnes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  nom TEXT,
  prenom TEXT,
  statut TEXT DEFAULT 'actif',
  date_inscription TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.permanences_peres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horaires_secretariat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sacrements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_abonnes ENABLE ROW LEVEL SECURITY;

-- Public read access for basic information
CREATE POLICY "Public can view permanences" ON public.permanences_peres FOR SELECT USING (true);
CREATE POLICY "Public can view horaires secretariat" ON public.horaires_secretariat FOR SELECT USING (true);
CREATE POLICY "Public can view sacrements" ON public.sacrements FOR SELECT USING (true);
CREATE POLICY "Public can view activites" ON public.activites FOR SELECT USING (true);
CREATE POLICY "Public can view evenements" ON public.evenements FOR SELECT USING (true);

-- Documents only public if approved
CREATE POLICY "Public can view approved documents" ON public.documents 
  FOR SELECT USING (statut = 'public' AND date_approbation IS NOT NULL);

-- Newsletter - public can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_abonnes 
  FOR INSERT WITH CHECK (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_updated_at_permanences BEFORE UPDATE ON public.permanences_peres
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_secretariat BEFORE UPDATE ON public.horaires_secretariat
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_sacrements BEFORE UPDATE ON public.sacrements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_activites BEFORE UPDATE ON public.activites
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_evenements BEFORE UPDATE ON public.evenements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_documents BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial data for permanences
INSERT INTO public.permanences_peres (jour, heure_debut, heure_fin, pretre, type_permanence) VALUES
('Lundi', '09:30', NULL, 'P. André', 'messe'),
('Lundi', '10:30', '12:00', 'P. André', 'permanence'),
('Lundi', '17:00', '19:00', 'P. André', 'permanence'),
('Mardi', '09:30', NULL, 'P. Curé', 'messe'),
('Mardi', '10:30', '12:00', 'P. Justin', 'permanence'),
('Mardi', '17:00', '19:00', 'P. Justin', 'permanence'),
('Mercredi', '09:30', NULL, 'P. Justin', 'messe'),
('Mercredi', '10:30', '12:00', 'P. André', 'permanence'),
('Mercredi', '17:00', '19:00', 'P. André', 'permanence'),
('Jeudi', '09:30', NULL, 'P. Curé', 'messe'),
('Jeudi', '10:30', '12:00', 'P. Justin', 'permanence'),
('Jeudi', '17:00', '19:00', 'P. Justin', 'permanence'),
('Vendredi', '09:30', NULL, 'P. André', 'messe'),
('Vendredi', '10:30', '12:00', 'P. André', 'permanence'),
('Vendredi', '17:00', '19:00', 'P. André', 'permanence');

-- Insert horaires secrétariat
INSERT INTO public.horaires_secretariat (jour, heure_ouverture, heure_fermeture, pause_debut, pause_fin) VALUES
('Lundi', '08:00', '18:00', '12:00', '14:00'),
('Mardi', '08:00', '18:00', '12:00', '14:00'),
('Mercredi', '08:00', '18:00', '12:00', '14:00'),
('Jeudi', '08:00', '18:00', '12:00', '14:00'),
('Vendredi', '08:00', '18:00', '12:00', '14:00'),
('Samedi', '08:00', '13:00', NULL, NULL);

-- Insert sacrements data
INSERT INTO public.sacrements (type_sacrement, titre, description, horaires, pieces_requises, tarifs, notes) VALUES
('bapteme', 'Baptême bébés (0 mois à 3 ans)', 'Sacrement du baptême pour les bébés et jeunes enfants', 
'Chaque 2ème et dernier samedi du mois',
ARRAY[
  '1 copie de l''extrait de naissance du bébé',
  'Carnet de baptême des parents',
  'Photocopie du carnet du parrain/marraine',
  '1 courrier de demande de baptême à remettre au secrétariat'
],
'Inscription : 15 000 FCFA à la carte / 30 000 FCFA',
'Des enveloppes de dons sont disponibles au secrétariat'),

('mariage', 'Mariage', 'Célébration du sacrement du mariage',
NULL,
ARRAY[
  '1 copie de l''extrait de naissance de chaque fiancé',
  '1 photocopie de CNI de chaque fiancé',
  '1 photo d''identité de chaque fiancé',
  'Carnet de baptême des fiancés',
  '1 photocopie de la CNI et du carnet de baptême des témoins',
  '1 copie de l''acte de mariage civil pour ceux qui l''ont déjà fait'
],
'Inscription pour l''école de mariage : 10 000 FCFA. Droit à payer (casuel + sono + tapis)',
'Rencontrer le Curé avant toute inscription. Enveloppes de dons disponibles au secrétariat'),

('funerailles', 'Funérailles', 'Organisation des cérémonies funéraires',
'Les veilleurs funèbres sont les mercredis à 20h00',
NULL,
NULL,
'Voir le Curé. Il peut y avoir plusieurs défunt(e)s au cours d''une veillée funèbre');