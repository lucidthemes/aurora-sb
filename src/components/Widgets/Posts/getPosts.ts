import { z } from 'zod';

import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { PostsWidgetPostSchema } from './posts.schema';
import type { PostsWidgetPost } from './posts.schema';

export async function getPostsWidgetPosts(limit?: number): Promise<PostsWidgetPost[] | null> {
  let query = supabase
    .from('posts')
    .select(
      `
    id, 
    title,
    slug, 
    media:media_id (
        storage_path,
        alt_text
    ), 
    created_at
    `
    )
    .eq('status', 'published');

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_WIDGET_FAILED', error.message);

    return null;
  }

  const parsed = z.array(PostsWidgetPostSchema).safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_POSTS_WIDGET_INVALID_DATA', 'Fetch posts widget failed schema validation');

    return null;
  }

  return parsed.data;
}
