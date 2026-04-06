DROP POLICY IF EXISTS "Admin and editor users can upload media" ON public.media;

CREATE POLICY "Admin and editor users can upload media"
ON public.media FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

DROP POLICY IF EXISTS "Admin and editor users can update media" ON public.media;

CREATE POLICY "Admin and editor users can update media"
ON public.media FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

DROP POLICY IF EXISTS "Admin and editor users can delete media" ON public.media;

CREATE POLICY "Admin and editor users can delete media"
ON public.media FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));