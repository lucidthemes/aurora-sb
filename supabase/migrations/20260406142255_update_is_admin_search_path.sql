CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
  RETURNS boolean
  LANGUAGE sql
  SECURITY DEFINER
  SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = uid
    AND role = 'admin'
  );
$$;