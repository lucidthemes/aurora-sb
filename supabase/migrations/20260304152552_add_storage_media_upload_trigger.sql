CREATE OR REPLACE FUNCTION public.handle_new_storage_object()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
AS $$
DECLARE
  media_type text;
BEGIN
  IF new.bucket_id = 'media' THEN

    IF (new.metadata ->> 'mimetype') LIKE 'image/%' THEN
      media_type := 'image';
    elsif (new.metadata ->> 'mimetype') LIKE 'video/%' THEN
      media_type := 'video';
    END IF;

    INSERT INTO public.media (type, path, created_at)
    VALUES (media_type, new.name, now());

  END IF;

  RETURN new;
END;
$$;

CREATE TRIGGER on_storage_object_created
AFTER INSERT ON storage.objects
FOR each ROW
EXECUTE FUNCTION public.handle_new_storage_object();