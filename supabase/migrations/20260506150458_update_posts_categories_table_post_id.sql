ALTER TABLE public.posts_categories
ADD COLUMN post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE;

ALTER TABLE public.posts_categories
ADD CONSTRAINT posts_categories_category_id_post_id_key UNIQUE (category_id, post_id);

