CREATE type public.pages_status as enum ('draft', 'published');

CREATE TABLE public.pages(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text NOT NULL,
    content jsonb,
    status pages_status NOT NULL DEFAULT 'draft',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.pages
ADD CONSTRAINT pages_slug_key UNIQUE (slug);

ALTER TABLE public.pages
ENABLE ROW LEVEL SECURITY;