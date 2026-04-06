CREATE OR REPLACE FUNCTION public.handle_new_storage_object()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
DECLARE
  media_type text;
BEGIN
  IF new.bucket_id != 'media' THEN
    RETURN new;
  END IF;

  IF new.name LIKE 'images/%' THEN
    media_type := 'image';
  ELSIF new.name LIKE 'videos/%' THEN
    media_type := 'video';
  ELSE
    RETURN new; -- skip unknown folders
  END IF;

  INSERT INTO public.media (type, storage_path)
  VALUES (media_type, new.name);

  RETURN new;
END;
$$;