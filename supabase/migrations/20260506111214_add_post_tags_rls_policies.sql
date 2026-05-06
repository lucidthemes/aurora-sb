CREATE POLICY "Enable read access for all users"
ON public.post_tags FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create post tags"
ON public.post_tags FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update post tags"
ON public.post_tags FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete post tags"
ON public.post_tags FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));