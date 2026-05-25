CREATE TABLE public.sidebars(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    title text NOT NULL,
    widgets jsonb,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.sidebars
ADD CONSTRAINT sidebars_name_key UNIQUE (name);

ALTER TABLE public.sidebars
ENABLE ROW LEVEL SECURITY;