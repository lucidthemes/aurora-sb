import { z } from 'zod';

import { FeedSettingsSchema, FeedMediaSchema } from '@schemas/instagram/feed.schema';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';
import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

export async function getFeedSettings(feedId: string): Promise<FeedSettings | null> {
  const { data, error } = await supabase.from('instagram_feeds').select('layout, button').eq('id', feedId).maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_FEED_SETTINGS_FAILED', error.message);

    return null;
  }

  if (!data) {
    await createLogEvent('error', 'FETCH_FEED_NOT_FOUND', `Feed ${feedId} not found`);

    return null;
  }

  const parsed = FeedSettingsSchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_FEED_INVALID_DATA', 'Feed settings failed schema validation');

    return null;
  }

  return parsed.data;
}

export async function getFeedMedia(feedId: string): Promise<FeedMedia[]> {
  const { data, error } = await supabase
    .from('instagram_feed_media')
    .select('id, media(storage_path, alt_text)')
    .eq('instagram_feed_id', feedId)
    .order('position');

  if (error) {
    await createLogEvent('error', 'FETCH_FEED_MEDIA_FAILED', error.message);

    return [];
  }

  const parsed = z.array(FeedMediaSchema).safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_FEED_INVALID_DATA', 'Feed media failed schema validation');

    return [];
  }

  return parsed.data;
}
