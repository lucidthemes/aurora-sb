import { useQuery } from '@tanstack/react-query';

import { getInstagramFeedSettings, getInstagramFeedMedia } from './getInstagramFeed';
import type { InstagramFeedSettings, InstagramFeedMedia } from './instagram.schema';

export default function useInstagramFeed(feedId: string) {
  const instagramFeedSettingsQuery = useQuery<InstagramFeedSettings | null>({
    queryKey: ['feedSettings', feedId],
    queryFn: () => getInstagramFeedSettings(feedId),
  });

  const instagramFeedMediaQuery = useQuery<InstagramFeedMedia[]>({
    queryKey: ['feedMedia', feedId],
    queryFn: () => getInstagramFeedMedia(feedId),
    enabled: instagramFeedSettingsQuery.isSuccess,
  });

  return { instagramFeedSettingsQuery, instagramFeedMediaQuery };
}
