CREATE TABLE public.post_categories(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.post_categories
ADD CONSTRAINT post_categories_slug_key UNIQUE (slug);

ALTER TABLE public.post_categories
ENABLE ROW LEVEL SECURITY;