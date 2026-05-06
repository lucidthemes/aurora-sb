CREATE POLICY "Enable read access for all users"
ON public.posts_tags FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create posts tags"
ON public.posts_tags FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update posts tags"
ON public.posts_tags FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete posts tags"
ON public.posts_tags FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));