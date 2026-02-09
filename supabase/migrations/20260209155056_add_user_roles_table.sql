CREATE type public.user_role as enum ('customer', 'admin');

CREATE TABLE public.user_roles (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   uuid NOT NULL REFERENCES auth.users on delete cascade,
  role      user_role NOT NULL,
  unique (user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);