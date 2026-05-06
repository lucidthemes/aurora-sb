ALTER TABLE public.posts_tags
ADD COLUMN post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE;

ALTER TABLE public.posts_tags
ADD CONSTRAINT posts_tags_tag_id_post_id_key UNIQUE (tag_id, post_id);

