CREATE OR REPLACE FUNCTION public.handle_delete_storage_object()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  IF OLD.bucket_id = 'media' THEN
    DELETE FROM public.media
    WHERE storage_path = OLD.name;
  END IF;

  RETURN OLD;
END;
$$;