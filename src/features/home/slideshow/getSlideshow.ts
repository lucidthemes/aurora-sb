import { z } from 'zod';

import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { SlideshowSchema } from './slideshow.schema';
import type { Slideshow } from './slideshow.schema';

export async function getSlideshow({ limit, category }: { limit?: number; category?: string }): Promise<Slideshow[] | null> {
  let categoryId = '';

  // fetch category id from the passed through category slug
  if (category) {
    const { data: categoryData, error: categoryError } = await supabase.from('post_categories').select('id').eq('slug', category).maybeSingle();

    if (categoryError) {
      await createLogEvent('error', 'FETCH_SLIDESHOW_TAXONOMY_FAILED', categoryError.message);

      return null;
    }

    if (categoryData?.id) categoryId = categoryData?.id;
  }

  // conditional category filter
  const categoryFilter = category
    ? `filter_categories:posts_categories!inner (
              category_id
            )`
    : `filter_categories:posts_categories (
              category_id
            )`;

  // main slideshow query
  let query = supabase
    .from('posts')
    .select(
      `
        id,
        title,
        slug,
        media:media_id (
            storage_path
        ),
        ${categoryFilter},
        excerpt
    `
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  if (category && categoryId) query = query.eq('filter_categories.category_id', categoryId);

  const { data, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_SLIDESHOW_FAILED', error.message);

    return null;
  }

  const parsed = z.array(SlideshowSchema).safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_SLIDESHOW_INVALID_DATA', 'Fetch slideshow failed schema validation');

    return null;
  }

  return parsed.data;
}
