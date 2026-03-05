CREATE OR REPLACE FUNCTION public.handle_delete_storage_object()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
AS $$
BEGIN
  IF OLD.bucket_id = 'media' THEN
    DELETE FROM public.media
    WHERE storage_path = OLD.name;
  END IF;

  RETURN OLD;
END;
$$;

CREATE TRIGGER on_storage_object_deleted
AFTER DELETE ON storage.objects
FOR each ROW
EXECUTE FUNCTION public.handle_delete_storage_object();