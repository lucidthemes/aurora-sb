CREATE POLICY "Admin and editor users can upload to media bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND (
    NAME LIKE 'images/%'
    OR NAME LIKE 'videos/%'
  )
  AND EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'editor')
  )
);