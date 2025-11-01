-- Fix profiles table structure
ALTER TABLE public.profiles DROP COLUMN IF EXISTS user_id;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS adresse text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profession text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_naissance date;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

-- Create app_role enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'catechiste', 'catechumene', 'parent', 'cure', 'aumonier', 'member');

-- Create user_roles table with proper security
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin (cure)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'cure')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Update profiles RLS to restrict visibility
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('parish-images', 'parish-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for parish images
CREATE POLICY "Parish images are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'parish-images');

CREATE POLICY "Admins can upload parish images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'parish-images' AND public.is_admin(auth.uid()));

-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);