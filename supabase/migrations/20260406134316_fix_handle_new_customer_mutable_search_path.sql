CREATE OR REPLACE FUNCTION public.handle_new_customer()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.customers (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;