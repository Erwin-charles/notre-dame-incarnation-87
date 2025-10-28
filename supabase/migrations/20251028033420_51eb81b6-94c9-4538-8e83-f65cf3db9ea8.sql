-- Create missing tables for the application

-- Profiles table for users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  nom TEXT,
  prenom TEXT,
  email TEXT,
  telephone TEXT,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Catechistes table
CREATE TABLE IF NOT EXISTS public.catechistes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT,
  telephone TEXT,
  niveau TEXT,
  statut TEXT DEFAULT 'actif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Catechumenes table
CREATE TABLE IF NOT EXISTS public.catechumenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE,
  niveau TEXT,
  catechiste_id UUID REFERENCES public.catechistes(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Liturgical events table
CREATE TABLE IF NOT EXISTS public.evenements_liturgiques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  date_evenement TIMESTAMP WITH TIME ZONE NOT NULL,
  type_evenement TEXT,
  lieu TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expediteur_id UUID REFERENCES public.profiles(id),
  destinataire_id UUID REFERENCES public.profiles(id),
  sujet TEXT,
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Paiements table
CREATE TABLE IF NOT EXISTS public.paiements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  montant DECIMAL(10,2) NOT NULL,
  type_paiement TEXT,
  statut TEXT DEFAULT 'en_attente',
  reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Presences table
CREATE TABLE IF NOT EXISTS public.presences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catechumene_id UUID REFERENCES public.catechumenes(id),
  date_presence DATE NOT NULL,
  present BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Evaluations table
CREATE TABLE IF NOT EXISTS public.evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catechumene_id UUID REFERENCES public.catechumenes(id),
  note DECIMAL(5,2),
  commentaire TEXT,
  date_evaluation DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catechistes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catechumenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements_liturgiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view liturgical events" ON public.evenements_liturgiques FOR SELECT USING (true);
CREATE POLICY "Public can view catechistes" ON public.catechistes FOR SELECT USING (true);

-- Profile trigger
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_catechistes BEFORE UPDATE ON public.catechistes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_catechumenes BEFORE UPDATE ON public.catechumenes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_liturgiques BEFORE UPDATE ON public.evenements_liturgiques
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_messages BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_paiements BEFORE UPDATE ON public.paiements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nom, prenom)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nom', ''),
    COALESCE(NEW.raw_user_meta_data->>'prenom', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to approve documents (for admin)
CREATE OR REPLACE FUNCTION public.approve_document(document_id UUID, approver_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.documents
  SET statut = 'public',
      approuve_par = approver_id,
      date_approbation = now()
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;