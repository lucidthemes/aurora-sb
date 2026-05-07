CREATE type public.posts_comments_status as enum ('approved', 'pending', 'rejected');

CREATE TABLE public.posts_comments(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    reply_to uuid REFERENCES public.posts_comments(id) ON DELETE SET NULL,
    name text NOT NULL,
    comment text NOT NULL,
    status posts_comments_status NOT NULL DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.posts_comments
ENABLE ROW LEVEL SECURITY;