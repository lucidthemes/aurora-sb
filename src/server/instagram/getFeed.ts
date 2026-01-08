import { z } from 'zod';

import { FeedSettingsSchema, FeedMediaSchema } from '@schemas/instagram/feed.schema';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';
import { supabase } from '@lib/supabase/client';

export async function getFeedSettings(feedId: string): Promise<FeedSettings> {
  try {
    const { data, error } = await supabase.from('instagram_feeds').select('layout, button').eq('id', feedId);

    if (error) {
      throw new Error(`Failed to fetch feed settings: ${error.message}`);
    }

    const parsed = z.array(FeedSettingsSchema).safeParse(data);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    return parsed.data[0];
  } catch (error) {
    console.error('getFeedSettings', error);
    throw error;
  }
}

export async function getFeedMedia(feedId: string): Promise<FeedMedia[]> {
  try {
    const { data, error } = await supabase
      .from('instagram_feed_media')
      .select('id, media(storage_path, alt_text)')
      .eq('instagram_feed_id', feedId)
      .order('position');

    if (error) {
      throw new Error(`Failed to fetch feed media: ${error.message}`);
    }

    const parsed = z.array(FeedMediaSchema).safeParse(data);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    return parsed.data;
  } catch (error) {
    console.error('getFeedMedia', error);
    throw error;
  }
}
