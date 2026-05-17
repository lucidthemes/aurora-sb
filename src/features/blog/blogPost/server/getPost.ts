import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { PostSchema } from '../schemas/post.schema';
import type { Post } from '../schemas/post.schema';

export async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
        id,
        title,
        slug,
        author:author_id (
          id,
          name,
          slug,
          description
        ),
        media:media_id (
          storage_path,
          alt_text
        ),
        categories:posts_categories (
          category:post_categories  (
            id,
            name,
            slug
          )
        ),
        tags:posts_tags (
          tag:post_tags (
            id,
            name,
           slug
          )
        ),
        related:posts_related_posts!post_id (
          post:posts!related_post_id (
            id,
            title,
            slug,
            media:media_id (
              storage_path,
              alt_text
            ),
            created_at
          )
        ),
        comments:posts_comments (
          id,
          reply_to,
          name,
          comment,
          status,
          created_at
        ),
        content,
        status,
        created_at,
        updated_at,
        options
    `
    )
    .eq('slug', slug)
    .eq('comments.status', 'approved')
    .maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_POST_FAILED', error.message);

    return null;
  }

  const normalized = {
    ...data,
    categories: data?.categories.map((c) => c.category),
    tags: data?.tags.map((t) => t.tag),
    related: data?.related.map((r) => r.post),
  };

  const parsed = PostSchema.safeParse(normalized);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_POST_INVALID_DATA', 'Fetch post failed schema validation');

    return null;
  }

  return parsed.data;
}
