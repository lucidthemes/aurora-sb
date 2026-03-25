DROP POLICY IF EXISTS "Admin users can view user roles" ON public.user_roles;

CREATE POLICY "Admin users can view user roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admin users can update user roles" ON public.user_roles;

CREATE POLICY "Admins can update user roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));