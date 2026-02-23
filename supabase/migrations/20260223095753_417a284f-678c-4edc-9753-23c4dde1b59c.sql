
-- Admin CRUD policies for all tables that currently only have SELECT

-- activites: admin can INSERT, UPDATE, DELETE
CREATE POLICY "Admins can insert activites" ON public.activites FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update activites" ON public.activites FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete activites" ON public.activites FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- catechistes
CREATE POLICY "Admins can insert catechistes" ON public.catechistes FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update catechistes" ON public.catechistes FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete catechistes" ON public.catechistes FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- catechumenes
CREATE POLICY "Admins can insert catechumenes" ON public.catechumenes FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update catechumenes" ON public.catechumenes FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete catechumenes" ON public.catechumenes FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- documents
CREATE POLICY "Admins can insert documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update documents" ON public.documents FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete documents" ON public.documents FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- evaluations
CREATE POLICY "Admins can insert evaluations" ON public.evaluations FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update evaluations" ON public.evaluations FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete evaluations" ON public.evaluations FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- evenements
CREATE POLICY "Admins can insert evenements" ON public.evenements FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update evenements" ON public.evenements FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete evenements" ON public.evenements FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- evenements_liturgiques
CREATE POLICY "Admins can insert evenements_liturgiques" ON public.evenements_liturgiques FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update evenements_liturgiques" ON public.evenements_liturgiques FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete evenements_liturgiques" ON public.evenements_liturgiques FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- horaires_secretariat
CREATE POLICY "Admins can insert horaires_secretariat" ON public.horaires_secretariat FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update horaires_secretariat" ON public.horaires_secretariat FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete horaires_secretariat" ON public.horaires_secretariat FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- intentions_messe: admin can SELECT, UPDATE, DELETE (INSERT already exists for anyone)
CREATE POLICY "Admins can view intentions_messe" ON public.intentions_messe FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update intentions_messe" ON public.intentions_messe FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete intentions_messe" ON public.intentions_messe FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- messages: admin and users can insert
CREATE POLICY "Authenticated can insert messages" ON public.messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = expediteur_id);
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE TO authenticated USING (auth.uid() = expediteur_id);
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE TO authenticated USING (auth.uid() = expediteur_id);

-- newsletter_abonnes: admin can SELECT, UPDATE, DELETE
CREATE POLICY "Admins can view newsletter_abonnes" ON public.newsletter_abonnes FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update newsletter_abonnes" ON public.newsletter_abonnes FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete newsletter_abonnes" ON public.newsletter_abonnes FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- paiements: users can insert own, admin can manage all
CREATE POLICY "Users can insert own payments" ON public.paiements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all payments" ON public.paiements FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update payments" ON public.paiements FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete payments" ON public.paiements FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- permanences_peres
CREATE POLICY "Admins can insert permanences" ON public.permanences_peres FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update permanences" ON public.permanences_peres FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete permanences" ON public.permanences_peres FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- presences
CREATE POLICY "Admins can insert presences" ON public.presences FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update presences" ON public.presences FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete presences" ON public.presences FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- sacrements
CREATE POLICY "Admins can insert sacrements" ON public.sacrements FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update sacrements" ON public.sacrements FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete sacrements" ON public.sacrements FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- profiles: allow trigger insert
CREATE POLICY "Service can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
