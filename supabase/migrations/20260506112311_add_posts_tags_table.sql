CREATE TABLE public.posts_tags(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_id uuid NOT NULL REFERENCES public.post_tags(id) ON DELETE CASCADE
);

ALTER TABLE public.posts_tags
ENABLE ROW LEVEL SECURITY;