-- Add missing columns
ALTER TABLE public.catechumenes 
ADD COLUMN IF NOT EXISTS parent_email TEXT;

-- Add basic RLS policies for tables without policies
CREATE POLICY "Authenticated users can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Authenticated can view catechumenes" ON public.catechumenes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can view presences" ON public.presences FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can view evaluations" ON public.evaluations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can view messages" ON public.messages FOR SELECT TO authenticated USING (expediteur_id = auth.uid() OR destinataire_id = auth.uid());
CREATE POLICY "Users can view own payments" ON public.paiements FOR SELECT TO authenticated USING (user_id = auth.uid());