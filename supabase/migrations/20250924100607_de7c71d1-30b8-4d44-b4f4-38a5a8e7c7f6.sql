-- Security fixes implementation

-- 1. Add document approval workflow
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS statut text DEFAULT 'en_attente';
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS approuve_par uuid;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS date_approbation timestamp with time zone;

-- 2. Update activities RLS policies - restrict to authenticated users instead of public access
DROP POLICY IF EXISTS "Everyone can view activities" ON public.activites;
CREATE POLICY "Authenticated users can view activities" 
ON public.activites 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 3. Update liturgical events RLS policies - restrict to authenticated users
DROP POLICY IF EXISTS "Everyone can view liturgical events" ON public.evenements_liturgiques;
CREATE POLICY "Authenticated users can view liturgical events" 
ON public.evenements_liturgiques 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 4. Update documents RLS policies to include approval workflow
DROP POLICY IF EXISTS "Public documents are viewable by everyone" ON public.documents;
CREATE POLICY "Approved public documents are viewable by authenticated users" 
ON public.documents 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND visibility_level = 'public' 
  AND statut = 'approuve'
);

-- Add policy for pending documents (admins only)
CREATE POLICY "Admins can view pending documents" 
ON public.documents 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  AND statut = 'en_attente'
);

-- 5. Enhanced newsletter privacy - restrict admin access to specific operations
DROP POLICY IF EXISTS "Admins can view all newsletter subscriptions" ON public.newsletter_abonnes;
CREATE POLICY "Admins can manage newsletter subscriptions for operations only" 
ON public.newsletter_abonnes 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  AND actif = true
);

-- Add policy for admins to approve/update newsletter status
CREATE POLICY "Admins can update newsletter subscription status" 
ON public.newsletter_abonnes 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 6. Add function to approve documents
CREATE OR REPLACE FUNCTION public.approve_document(
  document_id uuid
) 
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can approve documents
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can approve documents';
  END IF;
  
  UPDATE public.documents 
  SET 
    statut = 'approuve',
    approuve_par = auth.uid(),
    date_approbation = now()
  WHERE id = document_id;
END;
$$;