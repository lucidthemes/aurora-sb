import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getFeedSettings, getFeedMedia } from '@server/instagram/getFeed';
import { createLogEvent } from '@services/logs/createLogEvent';
import { FetchError } from '@services/errors/fetchError';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';

export default function useInstagramFeed(feedId: string) {
  const feedSettingsQuery = useQuery<FeedSettings, FetchError>({
    queryKey: ['feedSettings', feedId],
    queryFn: () => getFeedSettings(feedId),
  });

  const feedMediaQuery = useQuery<FeedMedia[], FetchError>({
    queryKey: ['feedMedia', feedId],
    queryFn: () => getFeedMedia(feedId),
    enabled: feedSettingsQuery.isSuccess,
  });

  useEffect(() => {
    if (feedSettingsQuery.status !== 'error') return;

    const error = feedSettingsQuery.error;
    if (!error) return;

    createLogEvent('error', error.code, error.message);
  }, [feedSettingsQuery.status]);

  useEffect(() => {
    if (feedMediaQuery.status !== 'error') return;

    const error = feedMediaQuery.error;
    if (!error) return;

    createLogEvent('error', error.code, error.message);
  }, [feedMediaQuery.status]);

  return { feedSettingsQuery, feedMediaQuery };
}
