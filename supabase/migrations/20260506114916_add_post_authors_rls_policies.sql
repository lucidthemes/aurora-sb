CREATE POLICY "Enable read access for all users"
ON public.post_authors FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create post authors"
ON public.post_authors FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update post authors"
ON public.post_authors FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete post authors"
ON public.post_authors FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));