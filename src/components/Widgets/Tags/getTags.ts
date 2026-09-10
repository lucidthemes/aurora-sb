import { z } from 'zod';

import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { TagsWidgetTagSchema } from './tags.schema';
import type { TagsWidgetTag } from './tags.schema';

export async function getTagsWidgetTags(limit?: number): Promise<TagsWidgetTag[] | null> {
  let query = supabase.from('post_tags').select('id, name, slug');

  if (limit && limit > 0) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_TAGS_WIDGET_FAILED', error.message);

    return null;
  }

  const parsed = z.array(TagsWidgetTagSchema).safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_TAGS_WIDGET_INVALID_DATA', 'Fetch tags widget failed schema validation');

    return null;
  }

  return parsed.data;
}
