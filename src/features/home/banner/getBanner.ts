import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { BannerSchema } from './banner.schema';

export async function getBanner(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`id, title, slug, media: media_id(storage_path), excerpt`)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_BANNER_FAILED', error.message);

    return null;
  }

  const parsed = BannerSchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_BANNER_INVALID_DATA', 'Fetch banner failed schema validation');

    return null;
  }

  return parsed.data;
}
