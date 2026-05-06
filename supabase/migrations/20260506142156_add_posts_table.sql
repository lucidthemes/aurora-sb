CREATE type public.posts_status as enum ('draft', 'published');

CREATE TABLE public.posts(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text NOT NULL,
    author_id uuid NOT NULL REFERENCES public.post_authors(id),
    media_id uuid NOT NULL REFERENCES public.media(id),
    excerpt text,
    content jsonb,
    status posts_status NOT NULL DEFAULT 'draft',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.posts
ADD CONSTRAINT posts_slug_key UNIQUE (slug);

ALTER TABLE public.posts
ENABLE ROW LEVEL SECURITY;