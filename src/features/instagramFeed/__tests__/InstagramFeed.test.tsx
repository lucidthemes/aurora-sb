import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/instagram/getFeed', () => ({
  getFeedSettings: vi.fn(),
  getFeedMedia: vi.fn(),
}));

import { getFeedSettings, getFeedMedia } from '@server/instagram/getFeed';
import type { FeedSettings, FeedMedia } from '@typings/instagram/feed';
import { renderWithQueryClient } from '@utils/tests/queryClient';

import InstagramFeed from '../InstagramFeed';

describe('InstagramFeed component', () => {
  const mockFeedSettingsQuery: FeedSettings = {
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

  const mockFeedMediaQuery: FeedMedia[] = [
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

  test('renders Instagram feed when feed settings and feed media are fetched', async () => {
    vi.mocked(getFeedSettings).mockResolvedValue(mockFeedSettingsQuery);
    vi.mocked(getFeedMedia).mockResolvedValue(mockFeedMediaQuery);

    renderWithQueryClient(
      <MemoryRouter>
        <InstagramFeed feedId="491b660b-3ed1-4281-b53b-b93d06231205" />
      </MemoryRouter>
    );

    const images = await screen.findAllByRole('listitem');
    expect(images).toHaveLength(3);

    const follow = await screen.findByRole('link', { name: /follow on Instagram/i });
    expect(follow).toBeInTheDocument();
  });
});
