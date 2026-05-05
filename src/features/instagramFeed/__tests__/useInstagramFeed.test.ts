import { waitFor } from '@testing-library/react';

vi.mock('../getInstagramFeed', () => ({
  getInstagramFeedSettings: vi.fn(),
  getInstagramFeedMedia: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import { getInstagramFeedSettings, getInstagramFeedMedia } from '../getInstagramFeed';
import type { InstagramFeedSettings, InstagramFeedMedia } from '../instagram.schema';
import useInstagramFeed from '../useInstagramFeed';

describe('useInstagramFeed hook', () => {
  const mockFeedId = '491b660b-3ed1-4281-b53b-b93d06231205';

  const mockFeedSettingsQuery: InstagramFeedSettings = {
    layout: {
      gap: 4,
      aspectRatio: 'square',
      mobilePosts: 1,
      tabletPosts: 4,
      desktopPosts: 6,
      mobileColumns: 1,
      tabletColumns: 4,
      desktopColumns: 6,
    },
    button: {
      enabled: true,
      link: 'https://aurora-sb.vercel.app/',
      text: 'Follow on Instagram',
    },
  };

  const mockFeedMediaQuery: InstagramFeedMedia[] = [
    {
      id: '35cc1b3d-a1d2-42fe-a0f8-bb81f44ddb94',
      media: {
        storage_path: 'instagram-1.jpg',
        alt_text: 'Instagram 1',
      },
    },
    {
      id: 'babc21b4-cfa0-4266-9e53-a6b4dd2431ca',
      media: {
        storage_path: 'instagram-2.jpg',
        alt_text: 'Instagram 2',
      },
    },
    {
      id: 'd59c5ebb-842b-4ea3-8521-fb6b4e258df8',
      media: {
        storage_path: 'instagram-3.jpg',
        alt_text: 'Instagram 3',
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches Instagram feed settings and feed media', async () => {
    vi.mocked(getInstagramFeedSettings).mockResolvedValue(mockFeedSettingsQuery);
    vi.mocked(getInstagramFeedMedia).mockResolvedValue(mockFeedMediaQuery);

    const { result } = renderHookWithQueryClient(() => useInstagramFeed(mockFeedId));

    await waitFor(() => {
      expect(result.current.instagramFeedSettingsQuery.data).toEqual(mockFeedSettingsQuery);
      expect(result.current.instagramFeedMediaQuery.data).toEqual(mockFeedMediaQuery);
      expect(result.current.instagramFeedMediaQuery.data).toHaveLength(3);
    });
  });
});
