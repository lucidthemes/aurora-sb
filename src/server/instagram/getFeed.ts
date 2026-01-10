import { z } from 'zod';

import { FeedSettingsSchema, FeedMediaSchema } from '@schemas/instagram/feed.schema';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';
import { supabase } from '@lib/supabase/client';

export async function getFeedSettings(feedId: string): Promise<FeedSettings> {
  const { data, error } = await supabase.from('instagram_feeds').select('layout, button').eq('id', feedId).maybeSingle();

  if (error) {
    throw new Error('FETCH_FAILED');
  }

  if (!data) {
    throw new Error(`FEED_NOT_FOUND`);
  }

  const parsed = FeedSettingsSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('INVALID_DATA');
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
    throw new Error('FETCH_FAILED');
  }

  const parsed = z.array(FeedMediaSchema).safeParse(data);

  if (!parsed.success) {
    throw new Error('INVALID_DATA');
  }

  return parsed.data;
}
