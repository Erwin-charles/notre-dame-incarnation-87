-- Configuration des types ENUM pour les rôles
CREATE TYPE public.user_role AS ENUM ('super_admin', 'cure', 'aumonier', 'catechiste', 'secretaire', 'tresorier', 'catechumene', 'parent', 'paroissien');

CREATE TYPE public.catechese_level AS ENUM ('eveil_foi', 'ce1_ce2', 'cm1_cm2', 'college', 'lycee', 'adulte');

CREATE TYPE public.event_type AS ENUM ('messe', 'formation', 'pelerinage', 'fete', 'reunion', 'celebration', 'autre');

CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

CREATE TYPE public.inscription_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

-- Table des profils utilisateur
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    telephone TEXT,
    adresse TEXT,
    date_naissance DATE,
    lieu_naissance TEXT,
    profession TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id)
);

-- Table des rôles utilisateur
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Table des catéchistes
CREATE TABLE public.catechistes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    experience TEXT,
    niveau_responsabilite catechese_level[],
    formation_complete BOOLEAN DEFAULT false,
    actif BOOLEAN DEFAULT true,
    date_inscription TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des catéchumènes
CREATE TABLE public.catechumenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    niveau catechese_level NOT NULL,
    classe_scolaire TEXT,
    annee_suivie TEXT,
    jour_cours TEXT,
    est_baptise BOOLEAN DEFAULT false,
    date_bapteme DATE,
    lieu_bapteme TEXT,
    nom_pere TEXT,
    nom_mere TEXT,
    nom_parrain TEXT,
    nom_marraine TEXT,
    motivation TEXT,
    status inscription_status DEFAULT 'pending',
    catechiste_id UUID REFERENCES public.catechistes(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des événements
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT NOT NULL,
    description TEXT,
    type event_type NOT NULL,
    date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
    date_fin TIMESTAMP WITH TIME ZONE,
    lieu TEXT,
    responsable_id UUID REFERENCES auth.users(id),
    max_participants INTEGER,
    prix DECIMAL(10,2) DEFAULT 0,
    image_url TEXT,
    actif BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des inscriptions aux événements
CREATE TABLE public.event_inscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status inscription_status DEFAULT 'pending',
    commentaire TEXT,
    date_inscription TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(event_id, user_id)
);

-- Table des groupes paroissiaux
CREATE TABLE public.groupes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    description TEXT,
    responsable_id UUID REFERENCES auth.users(id),
    jour_reunion TEXT,
    heure_reunion TIME,
    lieu_reunion TEXT,
    actif BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des membres de groupes
CREATE TABLE public.groupe_membres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    groupe_id UUID NOT NULL REFERENCES public.groupes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date_adhesion TIMESTAMP WITH TIME ZONE DEFAULT now(),
    actif BOOLEAN DEFAULT true,
    UNIQUE(groupe_id, user_id)
);

-- Table des paiements
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    montant DECIMAL(10,2) NOT NULL,
    service TEXT NOT NULL,
    reference_transaction TEXT,
    status payment_status DEFAULT 'pending',
    methode_paiement TEXT,
    event_id UUID REFERENCES public.events(id),
    catechumene_id UUID REFERENCES public.catechumenes(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des messages de contact
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    sujet TEXT NOT NULL,
    message TEXT NOT NULL,
    traite BOOLEAN DEFAULT false,
    traite_par UUID REFERENCES auth.users(id),
    date_traitement TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des actualités/annonces
CREATE TABLE public.actualites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    image_url TEXT,
    auteur_id UUID NOT NULL REFERENCES auth.users(id),
    publie BOOLEAN DEFAULT false,
    date_publication TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des sacrements
CREATE TABLE public.sacrements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    type_sacrement TEXT NOT NULL,
    date_sacrement DATE NOT NULL,
    lieu TEXT,
    celebrant TEXT,
    parrain TEXT,
    marraine TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catechistes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catechumenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groupes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groupe_membres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actualites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sacrements ENABLE ROW LEVEL SECURITY;

-- Fonction pour vérifier les rôles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fonction pour vérifier si l'utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('super_admin', 'cure', 'aumonier', 'secretaire')
  )
$$;

-- Politiques RLS pour profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.is_admin(auth.uid()));

-- Politiques RLS pour user_roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'cure'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Politiques RLS pour catechistes
CREATE POLICY "Catechistes can view their own data"
ON public.catechistes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Catechistes can update their own data"
ON public.catechistes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage catechistes"
ON public.catechistes FOR ALL
USING (public.is_admin(auth.uid()));

-- Politiques RLS pour catechumenes
CREATE POLICY "Catechumenes can view their own data"
ON public.catechumenes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Catechumenes can update their own data"
ON public.catechumenes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Catechumenes can insert their own data"
ON public.catechumenes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Catechistes can view their catechumenes"
ON public.catechumenes FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.catechistes c 
    WHERE c.user_id = auth.uid() AND c.id = catechiste_id
  )
);

CREATE POLICY "Admins can manage catechumenes"
ON public.catechumenes FOR ALL
USING (public.is_admin(auth.uid()));

-- Politiques RLS pour events
CREATE POLICY "Everyone can view active events"
ON public.events FOR SELECT
USING (actif = true);

CREATE POLICY "Admins can manage events"
ON public.events FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Event creators can manage their events"
ON public.events FOR ALL
USING (auth.uid() = created_by);

-- Politiques RLS pour event_inscriptions
CREATE POLICY "Users can view their own inscriptions"
ON public.event_inscriptions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inscriptions"
ON public.event_inscriptions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inscriptions"
ON public.event_inscriptions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all inscriptions"
ON public.event_inscriptions FOR ALL
USING (public.is_admin(auth.uid()));

-- Politiques RLS pour groupes
CREATE POLICY "Everyone can view active groups"
ON public.groupes FOR SELECT
USING (actif = true);

CREATE POLICY "Admins can manage groups"
ON public.groupes FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Group leaders can manage their groups"
ON public.groupes FOR ALL
USING (auth.uid() = responsable_id);

-- Politiques RLS pour groupe_membres
CREATE POLICY "Members can view their group memberships"
ON public.groupe_membres FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Members can insert their own memberships"
ON public.groupe_membres FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Group leaders can manage their group members"
ON public.groupe_membres FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.groupes g 
    WHERE g.id = groupe_id AND g.responsable_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all memberships"
ON public.groupe_membres FOR ALL
USING (public.is_admin(auth.uid()));

-- Politiques RLS pour payments
CREATE POLICY "Users can view their own payments"
ON public.payments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments"
ON public.payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments"
ON public.payments FOR ALL
USING (public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'tresorier'));

-- Politiques RLS pour contact_messages
CREATE POLICY "Admins can manage contact messages"
ON public.contact_messages FOR ALL
USING (public.is_admin(auth.uid()));

-- Politiques RLS pour actualites
CREATE POLICY "Everyone can view published actualites"
ON public.actualites FOR SELECT
USING (publie = true);

CREATE POLICY "Admins can manage actualites"
ON public.actualites FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Authors can manage their actualites"
ON public.actualites FOR ALL
USING (auth.uid() = auteur_id);

-- Politiques RLS pour sacrements
CREATE POLICY "Users can view their own sacrements"
ON public.sacrements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sacrements"
ON public.sacrements FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all sacrements"
ON public.sacrements FOR ALL
USING (public.is_admin(auth.uid()));

-- Trigger pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, nom, prenom)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'nom', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'prenom', '')
  );
  
  -- Assigner un rôle par défaut
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'paroissien');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_catechistes_updated_at
  BEFORE UPDATE ON public.catechistes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_catechumenes_updated_at
  BEFORE UPDATE ON public.catechumenes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_groupes_updated_at
  BEFORE UPDATE ON public.groupes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_actualites_updated_at
  BEFORE UPDATE ON public.actualites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Créer un utilisateur admin par défaut (optionnel)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES (gen_random_uuid(), 'admin@paroisse.ci', crypt('admin123', gen_salt('bf')), now(), now(), now());

-- Index pour améliorer les performances
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_catechistes_user_id ON public.catechistes(user_id);
CREATE INDEX idx_catechumenes_user_id ON public.catechumenes(user_id);
CREATE INDEX idx_events_date_debut ON public.events(date_debut);
CREATE INDEX idx_events_type ON public.events(type);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);