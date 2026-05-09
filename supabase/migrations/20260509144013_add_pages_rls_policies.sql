CREATE POLICY "Enable read access for all users"
ON public.pages FOR SELECT
USING (true);

CREATE POLICY "Admin and editor users can create pages"
ON public.pages FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can update pages"
ON public.pages FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editor users can delete pages"
ON public.pages FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));