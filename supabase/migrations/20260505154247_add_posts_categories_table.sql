CREATE TABLE public.posts_categories(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid NOT NULL REFERENCES public.post_categories(id) ON DELETE CASCADE
);

ALTER TABLE public.posts_categories
ENABLE ROW LEVEL SECURITY;