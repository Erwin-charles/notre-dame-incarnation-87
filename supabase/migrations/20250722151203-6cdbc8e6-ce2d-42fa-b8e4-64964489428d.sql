
-- Ajout de tables pour le calendrier liturgique
CREATE TABLE public.calendrier_liturgique (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_celebration DATE NOT NULL,
  nom_celebration TEXT NOT NULL,
  type_celebration TEXT NOT NULL CHECK (type_celebration IN ('avent', 'careme', 'paques', 'pentecote', 'ordinaire', 'fete_patronale', 'messe_chrismale', 'veillee_pascale')),
  couleur_liturgique TEXT CHECK (couleur_liturgique IN ('blanc', 'rouge', 'vert', 'violet', 'rose', 'noir')),
  description TEXT,
  readings TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Modification de la table intentions_messe pour ajouter les nouvelles heures
ALTER TABLE public.intentions_messe 
DROP CONSTRAINT IF EXISTS intentions_messe_heure_messe_check;

ALTER TABLE public.intentions_messe 
ADD CONSTRAINT intentions_messe_heure_messe_check 
CHECK (heure_messe::TEXT IN ('06:30:00', '08:00:00', '09:30:00', '11:00:00', '19:00:00'));

-- Ajout du numéro d'identification catéchumène
ALTER TABLE public.catechumenes 
ADD COLUMN numero_ndi TEXT UNIQUE;

-- Fonction pour générer automatiquement le numéro NDI
CREATE OR REPLACE FUNCTION generate_ndi_number()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
BEGIN
    -- Récupérer le prochain numéro séquentiel
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_ndi FROM 5) AS INTEGER)), 0) + 1
    INTO next_number
    FROM catechumenes
    WHERE numero_ndi IS NOT NULL;
    
    -- Générer le numéro NDI
    NEW.numero_ndi = 'NDI-' || LPAD(next_number::TEXT, 4, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer automatiquement le numéro NDI
CREATE TRIGGER trigger_generate_ndi
    BEFORE INSERT ON public.catechumenes
    FOR EACH ROW
    WHEN (NEW.numero_ndi IS NULL)
    EXECUTE FUNCTION generate_ndi_number();

-- Table pour les statistiques et évaluations
CREATE TABLE public.evaluations_catechumenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catechumene_id UUID REFERENCES catechumenes(id) ON DELETE CASCADE,
  trimestre INTEGER CHECK (trimestre IN (1, 2, 3)),
  annee_scolaire TEXT NOT NULL,
  note_participation DECIMAL(4,2),
  note_connaissance DECIMAL(4,2),
  note_comportement DECIMAL(4,2),
  moyenne_generale DECIMAL(4,2),
  commentaire TEXT,
  present_cours INTEGER DEFAULT 0,
  total_cours INTEGER DEFAULT 0,
  taux_assiduite DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour la présence aux cours
CREATE TABLE public.presences_cours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catechumene_id UUID REFERENCES catechumenes(id) ON DELETE CASCADE,
  date_cours DATE NOT NULL,
  present BOOLEAN DEFAULT false,
  excuse BOOLEAN DEFAULT false,
  motif_absence TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les servants de messe
CREATE TABLE public.servants_messe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  telephone TEXT,
  email TEXT,
  niveau_experience TEXT CHECK (niveau_experience IN ('debutant', 'intermediaire', 'confirme')),
  disponibilites TEXT[], -- jours de la semaine
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les plannings de service
CREATE TABLE public.plannings_service (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type_service TEXT NOT NULL CHECK (type_service IN ('servant_messe', 'accueil', 'lecteur', 'chorale')),
  date_service DATE NOT NULL,
  heure_service TIME NOT NULL,
  servant_id UUID REFERENCES servants_messe(id),
  user_id UUID REFERENCES auth.users(id), -- pour autres services
  statut TEXT DEFAULT 'prevu' CHECK (statut IN ('prevu', 'confirme', 'absent', 'remplace')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les méditations et publications quotidiennes
CREATE TABLE public.publications_quotidiennes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_publication DATE NOT NULL,
  type_publication TEXT NOT NULL CHECK (type_publication IN ('meditation', 'priere_mois', 'evangile', 'reflexion')),
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  auteur_id UUID NOT NULL,
  publie BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les documents de cours
CREATE TABLE public.documents_cours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  type_document TEXT CHECK (type_document IN ('cours', 'exercice', 'support', 'evaluation')),
  niveau TEXT, -- pour quel niveau de catéchèse
  fichier_url TEXT NOT NULL,
  taille_fichier INTEGER,
  type_mime TEXT,
  telechargeable BOOLEAN DEFAULT true,
  auteur_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les reçus d'inscription
CREATE TABLE public.recus_inscription (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catechumene_id UUID REFERENCES catechumenes(id) ON DELETE CASCADE,
  numero_recu TEXT UNIQUE NOT NULL,
  montant_paye DECIMAL(10,2) NOT NULL,
  date_paiement TIMESTAMPTZ NOT NULL,
  methode_paiement TEXT,
  details_paiement JSONB,
  fichier_recu_url TEXT,
  genere_le TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Fonction pour générer le numéro de reçu
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
    current_year TEXT;
BEGIN
    current_year := EXTRACT(YEAR FROM now())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_recu FROM LENGTH(current_year) + 3) AS INTEGER)), 0) + 1
    INTO next_number
    FROM recus_inscription
    WHERE numero_recu LIKE current_year || '-%';
    
    NEW.numero_recu = current_year || '-' || LPAD(next_number::TEXT, 6, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer automatiquement le numéro de reçu
CREATE TRIGGER trigger_generate_receipt_number
    BEFORE INSERT ON public.recus_inscription
    FOR EACH ROW
    WHEN (NEW.numero_recu IS NULL OR NEW.numero_recu = '')
    EXECUTE FUNCTION generate_receipt_number();

-- RLS Policies
ALTER TABLE public.calendrier_liturgique ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations_catechumenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presences_cours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servants_messe ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plannings_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications_quotidiennes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents_cours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recus_inscription ENABLE ROW LEVEL SECURITY;

-- Policies pour calendrier liturgique
CREATE POLICY "Everyone can view liturgical calendar" ON public.calendrier_liturgique
FOR SELECT USING (true);

CREATE POLICY "Admins can manage liturgical calendar" ON public.calendrier_liturgique
FOR ALL USING (is_admin(auth.uid()));

-- Policies pour évaluations
CREATE POLICY "Catechumenes can view their evaluations" ON public.evaluations_catechumenes
FOR SELECT USING (EXISTS (
  SELECT 1 FROM catechumenes c WHERE c.id = catechumene_id AND c.user_id = auth.uid()
));

CREATE POLICY "Catechistes can manage evaluations" ON public.evaluations_catechumenes
FOR ALL USING (EXISTS (
  SELECT 1 FROM catechistes ct WHERE ct.user_id = auth.uid()
) OR is_admin(auth.uid()));

-- Policies pour présences
CREATE POLICY "Catechumenes can view their presence" ON public.presences_cours
FOR SELECT USING (EXISTS (
  SELECT 1 FROM catechumenes c WHERE c.id = catechumene_id AND c.user_id = auth.uid()
));

CREATE POLICY "Catechistes can manage presence" ON public.presences_cours
FOR ALL USING (EXISTS (
  SELECT 1 FROM catechistes ct WHERE ct.user_id = auth.uid()
) OR is_admin(auth.uid()));

-- Policies pour servants de messe
CREATE POLICY "Everyone can view active servants" ON public.servants_messe
FOR SELECT USING (actif = true);

CREATE POLICY "Admins can manage servants" ON public.servants_messe
FOR ALL USING (is_admin(auth.uid()));

-- Policies pour plannings
CREATE POLICY "Everyone can view service schedules" ON public.plannings_service
FOR SELECT USING (true);

CREATE POLICY "Admins can manage service schedules" ON public.plannings_service
FOR ALL USING (is_admin(auth.uid()));

-- Policies pour publications quotidiennes
CREATE POLICY "Everyone can view published daily content" ON public.publications_quotidiennes
FOR SELECT USING (publie = true);

CREATE POLICY "Authors can manage their publications" ON public.publications_quotidiennes
FOR ALL USING (auteur_id = auth.uid());

CREATE POLICY "Admins can manage all publications" ON public.publications_quotidiennes
FOR ALL USING (is_admin(auth.uid()));

-- Policies pour documents de cours
CREATE POLICY "Everyone can view downloadable documents" ON public.documents_cours
FOR SELECT USING (telechargeable = true);

CREATE POLICY "Authors can manage their documents" ON public.documents_cours
FOR ALL USING (auteur_id = auth.uid());

CREATE POLICY "Admins can manage all documents" ON public.documents_cours
FOR ALL USING (is_admin(auth.uid()));

-- Policies pour reçus
CREATE POLICY "Catechumenes can view their receipts" ON public.recus_inscription
FOR SELECT USING (EXISTS (
  SELECT 1 FROM catechumenes c WHERE c.id = catechumene_id AND c.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all receipts" ON public.recus_inscription
FOR ALL USING (is_admin(auth.uid()));

-- Triggers pour updated_at
CREATE TRIGGER update_calendrier_liturgique_updated_at
BEFORE UPDATE ON public.calendrier_liturgique
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evaluations_catechumenes_updated_at
BEFORE UPDATE ON public.evaluations_catechumenes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_servants_messe_updated_at
BEFORE UPDATE ON public.servants_messe
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plannings_service_updated_at
BEFORE UPDATE ON public.plannings_service
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_publications_quotidiennes_updated_at
BEFORE UPDATE ON public.publications_quotidiennes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_cours_updated_at
BEFORE UPDATE ON public.documents_cours
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
