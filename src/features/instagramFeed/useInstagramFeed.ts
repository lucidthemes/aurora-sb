import { useQuery } from '@tanstack/react-query';

import { getFeedSettings, getFeedMedia } from '@server/instagram/getFeed';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';

export default function useInstagramFeed(feedId: string) {
  const feedSettingsQuery = useQuery<FeedSettings | null>({
    queryKey: ['feedSettings', feedId],
    queryFn: () => getFeedSettings(feedId),
  });

  const feedMediaQuery = useQuery<FeedMedia[]>({
    queryKey: ['feedMedia', feedId],
    queryFn: () => getFeedMedia(feedId),
    enabled: feedSettingsQuery.isSuccess,
  });

  return { feedSettingsQuery, feedMediaQuery };
}
