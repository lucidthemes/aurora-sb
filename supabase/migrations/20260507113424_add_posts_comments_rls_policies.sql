CREATE POLICY "Enable read access for all users"
ON public.posts_comments FOR SELECT
USING (true);

CREATE POLICY "Enable insert access for all users"
ON public.posts_comments FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admin and editor users can update posts comments"
ON public.posts_comments FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete posts comments"
ON public.posts_comments FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));