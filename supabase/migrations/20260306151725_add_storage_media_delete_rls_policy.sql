CREATE POLICY "Admin and editor users can delete from media bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (
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