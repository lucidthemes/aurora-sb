DROP POLICY IF EXISTS "Admin and editor users can create instagram feeds" ON public.instagram_feeds;

CREATE POLICY "Admin and editor users can create instagram feeds"
ON public.instagram_feeds FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

DROP POLICY IF EXISTS "Admin and editor users can update instagram feeds" ON public.instagram_feeds;

CREATE POLICY "Admin and editor users can update instagram feeds"
ON public.instagram_feeds FOR UPDATE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

DROP POLICY IF EXISTS "Admin and editor users can delete instagram feeds" ON public.instagram_feeds;

CREATE POLICY "Admin and editor users can delete instagram feeds"
ON public.instagram_feeds FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));