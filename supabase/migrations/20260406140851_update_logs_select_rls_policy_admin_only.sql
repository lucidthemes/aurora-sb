DROP POLICY IF EXISTS "Admin and editor users can view logs" ON public.logs;

CREATE POLICY "Admin users can view logs"
ON public.logs FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));