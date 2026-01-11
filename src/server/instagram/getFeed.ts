import { z } from 'zod';

import { FeedSettingsSchema, FeedMediaSchema } from '@schemas/instagram/feed.schema';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';
import { supabase } from '@lib/supabase/client';
import { FetchError } from '@services/errors/fetchError';

export async function getFeedSettings(feedId: string): Promise<FeedSettings> {
  const { data, error } = await supabase.from('instagram_feeds').select('layout, button').eq('id', feedId).maybeSingle();

  if (error) {
    throw new FetchError('FETCH_FEED_SETTINGS_FAILED', error.message);
  }

  if (!data) {
    throw new FetchError('FETCH_FEED_NOT_FOUND', `Feed ${feedId} not found`);
  }

  const parsed = FeedSettingsSchema.safeParse(data);

  if (!parsed.success) {
    throw new FetchError('FETCH_FEED_INVALID_DATA', 'Feed settings failed schema validation');
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
    throw new FetchError('FETCH_FEED_MEDIA_FAILED', error.message);
  }

  const parsed = z.array(FeedMediaSchema).safeParse(data);

  if (!parsed.success) {
    throw new FetchError('FETCH_FEED_INVALID_DATA', 'Feed media failed schema validation');
  }

  return parsed.data;
}
