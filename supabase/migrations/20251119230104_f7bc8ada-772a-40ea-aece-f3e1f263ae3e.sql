-- Création de la table des inscriptions aux activités
CREATE TABLE public.inscriptions_activites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activite_titre TEXT NOT NULL,
  activite_type TEXT,
  activite_date TEXT,
  activite_lieu TEXT,
  date_inscription TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  statut TEXT NOT NULL DEFAULT 'confirme',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_activite UNIQUE(user_id, activite_titre)
);

-- Activer Row Level Security
ALTER TABLE public.inscriptions_activites ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres inscriptions
CREATE POLICY "Users can view their own inscriptions"
ON public.inscriptions_activites
FOR SELECT
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres inscriptions
CREATE POLICY "Users can create their own inscriptions"
ON public.inscriptions_activites
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres inscriptions (se désinscrire)
CREATE POLICY "Users can delete their own inscriptions"
ON public.inscriptions_activites
FOR DELETE
USING (auth.uid() = user_id);

-- Les admins peuvent voir toutes les inscriptions
CREATE POLICY "Admins can view all inscriptions"
ON public.inscriptions_activites
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Les admins peuvent mettre à jour le statut des inscriptions
CREATE POLICY "Admins can update inscriptions"
ON public.inscriptions_activites
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Créer un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_inscriptions_activites_updated_at
BEFORE UPDATE ON public.inscriptions_activites
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Créer un index pour améliorer les performances des requêtes
CREATE INDEX idx_inscriptions_user_id ON public.inscriptions_activites(user_id);
CREATE INDEX idx_inscriptions_activite_titre ON public.inscriptions_activites(activite_titre);