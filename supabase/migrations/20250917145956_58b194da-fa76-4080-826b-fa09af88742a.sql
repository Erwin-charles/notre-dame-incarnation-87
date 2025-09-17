-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nom TEXT,
  prenom TEXT,
  telephone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create catechists table
CREATE TABLE public.catechistes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  specialite TEXT,
  experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create catechumens table
CREATE TABLE public.catechumenes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT,
  telephone TEXT,
  date_naissance DATE,
  niveau TEXT,
  statut TEXT DEFAULT 'inscrit',
  parent_nom TEXT,
  parent_email TEXT,
  parent_telephone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create evaluations table
CREATE TABLE public.evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  catechumene_id UUID NOT NULL REFERENCES public.catechumenes(id) ON DELETE CASCADE,
  niveau TEXT NOT NULL,
  note DECIMAL(4,2),
  commentaire TEXT,
  date_evaluation DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create presences table
CREATE TABLE public.presences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  catechumene_id UUID NOT NULL REFERENCES public.catechumenes(id) ON DELETE CASCADE,
  date_cours DATE NOT NULL,
  present BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create paiements table
CREATE TABLE public.paiements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  montant DECIMAL(10,2) NOT NULL,
  statut TEXT DEFAULT 'en_attente',
  type_paiement TEXT,
  reference_transaction TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expediteur_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destinataire_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sujet TEXT NOT NULL,
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create evenements_liturgiques table
CREATE TABLE public.evenements_liturgiques (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  date_evenement DATE NOT NULL,
  heure_debut TIME,
  heure_fin TIME,
  lieu TEXT,
  type_evenement TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activites table
CREATE TABLE public.activites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  date_activite DATE NOT NULL,
  heure_debut TIME,
  heure_fin TIME,
  lieu TEXT,
  responsable_id UUID REFERENCES auth.users(id),
  places_disponibles INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inscriptions_activites table
CREATE TABLE public.inscriptions_activites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activite_id UUID NOT NULL REFERENCES public.activites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  statut TEXT DEFAULT 'en_attente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(activite_id, user_id)
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  fichier_url TEXT,
  type_document TEXT,
  categorie TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create intentions_messe table
CREATE TABLE public.intentions_messe (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  intention TEXT NOT NULL,
  date_messe DATE,
  nom_demandeur TEXT,
  email_demandeur TEXT,
  telephone_demandeur TEXT,
  montant_don DECIMAL(8,2),
  statut TEXT DEFAULT 'en_attente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_abonnes table
CREATE TABLE public.newsletter_abonnes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nom TEXT,
  prenom TEXT,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catechistes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catechumenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements_liturgiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscriptions_activites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intentions_messe ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_abonnes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for catechistes
CREATE POLICY "Users can view their own catechist profile" ON public.catechistes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own catechist profile" ON public.catechistes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for catechumenes
CREATE POLICY "Users can view their own catechumen profile" ON public.catechumenes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own catechumen profile" ON public.catechumenes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for evaluations
CREATE POLICY "Users can view evaluations of their catechumens" ON public.evaluations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.catechumenes 
      WHERE id = evaluations.catechumene_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for presences
CREATE POLICY "Users can view presences of their catechumens" ON public.presences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.catechumenes 
      WHERE id = presences.catechumene_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for paiements
CREATE POLICY "Users can view their own payments" ON public.paiements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments" ON public.paiements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (auth.uid() = expediteur_id OR auth.uid() = destinataire_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = expediteur_id);

-- RLS Policies for evenements_liturgiques (public read)
CREATE POLICY "Everyone can view liturgical events" ON public.evenements_liturgiques
  FOR SELECT USING (true);

-- RLS Policies for activites (public read)
CREATE POLICY "Everyone can view activities" ON public.activites
  FOR SELECT USING (true);

-- RLS Policies for inscriptions_activites
CREATE POLICY "Users can view their own activity registrations" ON public.inscriptions_activites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for activities" ON public.inscriptions_activites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for documents (public read)
CREATE POLICY "Everyone can view documents" ON public.documents
  FOR SELECT USING (true);

-- RLS Policies for intentions_messe
CREATE POLICY "Users can view their own mass intentions" ON public.intentions_messe
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create mass intentions" ON public.intentions_messe
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for newsletter_abonnes (public insert for subscriptions)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_abonnes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" ON public.newsletter_abonnes
  FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, nom, prenom)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'nom',
    NEW.raw_user_meta_data ->> 'prenom'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();