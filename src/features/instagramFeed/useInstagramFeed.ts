import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getFeedSettings, getFeedMedia } from '@server/instagram/getFeed';
import { createLogEvent } from '@services/logs/createLogEvent';
import { FetchError } from '@services/errors/fetchError';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';

export default function useInstagramFeed(feedId: string) {
  const feedSettingsQuery = useQuery<FeedSettings, FetchError>({
    queryKey: ['feedSettings', { feedId }],
    queryFn: () => getFeedSettings(feedId),
  });

  useEffect(() => {
    if (feedSettingsQuery.isError) {
      createLogEvent('error', feedSettingsQuery.error.code, feedSettingsQuery.error.message);
    }
  }, [feedSettingsQuery.isError, feedSettingsQuery.error]);

  const feedMediaQuery = useQuery<FeedMedia[], FetchError>({
    queryKey: ['feedMedia', { feedId }],
    queryFn: () => getFeedMedia(feedId),
    enabled: feedSettingsQuery.isSuccess,
  });

  useEffect(() => {
    if (feedMediaQuery.isError) {
      createLogEvent('error', feedMediaQuery.error.code, feedMediaQuery.error.message);
    }
  }, [feedMediaQuery.isError, feedMediaQuery.error]);

  return { feedSettingsQuery, feedMediaQuery };
}
