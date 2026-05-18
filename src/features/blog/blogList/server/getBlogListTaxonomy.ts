import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { PostTaxonomySchema } from '../schemas/taxonomy.schema';
import type { PostTaxonomy } from '../schemas/taxonomy.schema';

export async function getBlogListTaxonomy({ taxonomy, slug }: { taxonomy: 'category' | 'tag' | 'author'; slug: string }): Promise<PostTaxonomy | null> {
  if (!taxonomy || !slug) return null;

  let table;

  switch (taxonomy) {
    case 'category':
      table = 'post_categories';
      break;
    case 'tag':
      table = 'post_tags';
      break;
    case 'author':
      table = 'post_authors';
      break;
  }

  const { data, error } = await supabase.from(table).select('id, name, description').eq('slug', slug).maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_BLOG_LIST_TAXONOMY_FAILED', error.message);

    return null;
  }

  if (!data) {
    await createLogEvent('error', 'FETCH_BLOG_LIST_TAXONOMY_NOT_FOUND', `Blog list taxonomy ${taxonomy} not found`);

    return null;
  }

  const parsed = PostTaxonomySchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_BLOG_LIST_TAXONOMY_INVALID_DATA', `Fetch blog list taxonomy ${taxonomy} failed schema validation`);

    return null;
  }

  return parsed.data;
}
