CREATE VIEW public.customers_list AS
SELECT
  c.*,
  u.email
FROM public.customers c
LEFT JOIN auth.users u ON c.id = u.id;