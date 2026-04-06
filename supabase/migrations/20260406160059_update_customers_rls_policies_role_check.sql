DROP POLICY IF EXISTS "Admin and editor users can view customers" ON public.customers;

CREATE POLICY "Admin and editor users can view customers"
ON public.customers FOR SELECT
TO authenticated
USING (public.is_admin_or_editor(auth.uid()));