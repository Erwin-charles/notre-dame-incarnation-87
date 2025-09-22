-- Phase 1: Critical Security Fixes (handling existing app_role type)

-- 1. Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer functions (replace if exists)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
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

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = auth.uid() 
  ORDER BY 
    CASE role 
      WHEN 'admin' THEN 1 
      WHEN 'catechist' THEN 2 
      WHEN 'user' THEN 3 
    END 
  LIMIT 1
$$;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Fix Newsletter Privacy Breach - CRITICAL SECURITY FIX
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletter_abonnes;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_abonnes;

-- New secure newsletter policies
CREATE POLICY "Users can view only their own newsletter subscription" 
ON public.newsletter_abonnes 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_abonnes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own subscription" 
ON public.newsletter_abonnes 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL AND 
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE POLICY "Admins can view all newsletter subscriptions" 
ON public.newsletter_abonnes 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Add missing UPDATE policies for user-owned data
DROP POLICY IF EXISTS "Users can update their own catechist profile" ON public.catechistes;
DROP POLICY IF EXISTS "Users can update their own catechumen profile" ON public.catechumenes;
DROP POLICY IF EXISTS "Users can update their own mass intentions" ON public.intentions_messe;
DROP POLICY IF EXISTS "Users can update their own payments" ON public.paiements;

CREATE POLICY "Users can update their own catechist profile" 
ON public.catechistes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own catechumen profile" 
ON public.catechumenes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own mass intentions" 
ON public.intentions_messe 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" 
ON public.paiements 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Add admin policies for content management
DROP POLICY IF EXISTS "Admins can manage activities" ON public.activites;
DROP POLICY IF EXISTS "Admins can manage liturgical events" ON public.evenements_liturgiques;
DROP POLICY IF EXISTS "Admins can manage documents" ON public.documents;

CREATE POLICY "Admins can manage activities" 
ON public.activites 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage liturgical events" 
ON public.evenements_liturgiques 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage documents" 
ON public.documents 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Enhance document security with categories
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS visibility_level TEXT DEFAULT 'public';
ALTER TABLE public.documents ADD CONSTRAINT IF NOT EXISTS documents_visibility_level_check CHECK (visibility_level IN ('public', 'members', 'catechists', 'admin'));

-- Update document policies for better security
DROP POLICY IF EXISTS "Everyone can view documents" ON public.documents;
DROP POLICY IF EXISTS "Public documents are viewable by everyone" ON public.documents;
DROP POLICY IF EXISTS "Member documents are viewable by authenticated users" ON public.documents;
DROP POLICY IF EXISTS "Catechist documents are viewable by catechists and admins" ON public.documents;
DROP POLICY IF EXISTS "Admin documents are viewable by admins only" ON public.documents;

CREATE POLICY "Public documents are viewable by everyone" 
ON public.documents 
FOR SELECT 
USING (visibility_level = 'public');

CREATE POLICY "Member documents are viewable by authenticated users" 
ON public.documents 
FOR SELECT 
USING (
  visibility_level = 'members' AND 
  auth.uid() IS NOT NULL
);

CREATE POLICY "Catechist documents are viewable by catechists and admins" 
ON public.documents 
FOR SELECT 
USING (
  visibility_level = 'catechists' AND 
  (public.has_role(auth.uid(), 'catechist') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Admin documents are viewable by admins only" 
ON public.documents 
FOR SELECT 
USING (
  visibility_level = 'admin' AND 
  public.has_role(auth.uid(), 'admin')
);

-- Insert default role for existing users (if not already present)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'user'::app_role
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_roles)
ON CONFLICT (user_id, role) DO NOTHING;