import { useQuery } from '@tanstack/react-query';

import { getFeedSettings, getFeedMedia } from '@server/instagram/getFeed';

export default function useInstagramFeed(feedId: string) {
  const feedSettingsQuery = useQuery({
    queryKey: ['feedSettings', { feedId }],
    queryFn: () => getFeedSettings(feedId),
  });

  const feedMediaQuery = useQuery({
    queryKey: ['feedMedia', { feedId }],
    queryFn: () => getFeedMedia(feedId),
  });

  return { feedSettingsQuery, feedMediaQuery };
}
