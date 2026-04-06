DROP POLICY IF EXISTS "Admin and editor users can create instagram feed media" ON public.instagram_feed_media;

CREATE POLICY "Admin and editor users can create instagram feed media"
ON public.instagram_feed_media FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_editor(auth.uid()));

DROP POLICY IF EXISTS "Admin and editor users can delete instagram feed media" ON public.instagram_feed_media;

CREATE POLICY "Admin and editor users can delete instagram feed media"
ON public.instagram_feed_media FOR DELETE
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));