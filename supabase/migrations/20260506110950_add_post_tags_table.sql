CREATE TABLE public.post_tags(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.post_tags
ADD CONSTRAINT post_tags_slug_key UNIQUE (slug);

ALTER TABLE public.post_tags
ENABLE ROW LEVEL SECURITY;