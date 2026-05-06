CREATE POLICY "Enable read access for all users"
ON public.posts_related_posts FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create posts related posts"
ON public.posts_related_posts FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update posts related posts"
ON public.posts_related_posts FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete posts related posts"
ON public.posts_related_posts FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));