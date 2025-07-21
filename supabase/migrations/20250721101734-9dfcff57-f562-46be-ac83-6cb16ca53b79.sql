-- Tables pour newsletter et intentions de messe
CREATE TABLE public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  nom TEXT,
  prenom TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscribed BOOLEAN DEFAULT true,
  date_inscription TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.intentions_messe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  intention TEXT NOT NULL,
  date_messe DATE NOT NULL,
  heure_messe TIME,
  don_montant NUMERIC DEFAULT 0,
  status inscription_status DEFAULT 'pending',
  traite BOOLEAN DEFAULT false,
  traite_par UUID,
  date_traitement TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.resources_spirituelles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('homelie', 'lecture', 'priere', 'chapelet', 'catechese')),
  contenu TEXT NOT NULL,
  date_publication DATE DEFAULT CURRENT_DATE,
  auteur_id UUID NOT NULL,
  tags TEXT[],
  image_url TEXT,
  audio_url TEXT,
  video_url TEXT,
  publie BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.galerie_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  event_id UUID REFERENCES events(id),
  auteur_id UUID NOT NULL,
  publie BOOLEAN DEFAULT false,
  date_prise DATE,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.dons_ligne (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donateur_nom TEXT NOT NULL,
  donateur_email TEXT NOT NULL,
  donateur_telephone TEXT,
  user_id UUID REFERENCES auth.users(id),
  montant NUMERIC NOT NULL CHECK (montant > 0),
  type_don TEXT NOT NULL CHECK (type_don IN ('denier_culte', 'caritas', 'mission', 'construction', 'autre')),
  message_donateur TEXT,
  methode_paiement TEXT,
  reference_transaction TEXT,
  status payment_status DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intentions_messe ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources_spirituelles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galerie_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dons_ligne ENABLE ROW LEVEL SECURITY;

-- Newsletter subscriptions policies
CREATE POLICY "Users can manage their newsletter subscription" ON public.newsletter_subscriptions
FOR ALL
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Anyone can insert newsletter subscription" ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

-- Intentions de messe policies
CREATE POLICY "Users can view their intentions" ON public.intentions_messe
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Users can insert their intentions" ON public.intentions_messe
FOR INSERT
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admins can manage all intentions" ON public.intentions_messe
FOR ALL
USING (is_admin(auth.uid()));

-- Resources spirituelles policies
CREATE POLICY "Everyone can view published resources" ON public.resources_spirituelles
FOR SELECT
USING (publie = true);

CREATE POLICY "Authors can manage their resources" ON public.resources_spirituelles
FOR ALL
USING (auteur_id = auth.uid());

CREATE POLICY "Admins can manage all resources" ON public.resources_spirituelles
FOR ALL
USING (is_admin(auth.uid()));

-- Galerie media policies
CREATE POLICY "Everyone can view published media" ON public.galerie_media
FOR SELECT
USING (publie = true);

CREATE POLICY "Authors can manage their media" ON public.galerie_media
FOR ALL
USING (auteur_id = auth.uid());

CREATE POLICY "Admins can manage all media" ON public.galerie_media
FOR ALL
USING (is_admin(auth.uid()));

-- Dons en ligne policies
CREATE POLICY "Users can view their donations" ON public.dons_ligne
FOR SELECT
USING (user_id = auth.uid() OR donateur_email = auth.email());

CREATE POLICY "Anyone can insert donations" ON public.dons_ligne
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all donations" ON public.dons_ligne
FOR ALL
USING (is_admin(auth.uid()) OR has_role(auth.uid(), 'tresorier'));

-- Triggers for updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_intentions_messe_updated_at
BEFORE UPDATE ON public.intentions_messe
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_spirituelles_updated_at
BEFORE UPDATE ON public.resources_spirituelles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_galerie_media_updated_at
BEFORE UPDATE ON public.galerie_media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dons_ligne_updated_at
BEFORE UPDATE ON public.dons_ligne
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();