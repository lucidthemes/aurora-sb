CREATE TABLE public.posts_related_posts(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    related_post_id uuid NOT NULL REFERENCES public.posts(id),
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE
);

ALTER TABLE public.posts_related_posts
ADD CONSTRAINT posts_related_posts_related_post_id_post_id_key UNIQUE (related_post_id, post_id);

ALTER TABLE public.posts_related_posts
ENABLE ROW LEVEL SECURITY;