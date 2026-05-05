CREATE POLICY "Enable read access for all users"
ON public.post_categories FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create post categories"
ON public.post_categories FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update post categories"
ON public.post_categories FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete post categories"
ON public.post_categories FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));