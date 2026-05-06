CREATE POLICY "Enable read access for all users"
ON public.posts FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create posts"
ON public.posts FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update posts"
ON public.posts FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete posts"
ON public.posts FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));