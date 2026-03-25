CREATE VIEW public.users_list AS
SELECT
  u.id,
  u.email,
  u.email_confirmed_at,
  u.email_change,
  u.email_change_sent_at,
  u.recovery_sent_at,
  u.created_at,
  u.updated_at,
  u.last_sign_in_at,
  ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur
ON u.id = ur.user_id;

REVOKE ALL ON public.users_list FROM anon, authenticated;