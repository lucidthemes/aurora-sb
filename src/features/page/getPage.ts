import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { PageSchema } from './page.schema';
import type { Page } from './page.schema';

export async function getPage(slug: string): Promise<Page | null> {
  const { data, error } = await supabase.from('pages').select('title, content, options').eq('slug', slug).eq('status', 'published').maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_PAGE_FAILED', error.message);

    return null;
  }

  const parsed = PageSchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_PAGE_INVALID_DATA', 'Fetch page failed schema validation');

    return null;
  }

  return parsed.data;
}
