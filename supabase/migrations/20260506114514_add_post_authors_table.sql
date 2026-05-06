CREATE TABLE public.post_authors(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.post_authors
ADD CONSTRAINT post_authors_slug_key UNIQUE (slug);

ALTER TABLE public.post_authors
ENABLE ROW LEVEL SECURITY;