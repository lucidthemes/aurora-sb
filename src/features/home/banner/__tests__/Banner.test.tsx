import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../getBanner', () => ({
  getBanner: vi.fn(),
}));

import { renderWithQueryClient } from '@utils/tests/queryClient';

import Banner from '../Banner';
import { getBanner } from '../getBanner';
import type { Banner as BannerType } from '../banner.schema';

describe('Banner component', () => {
  const mockSlug = 'dune-walk';

  const mockBanner: BannerType = {
    id: 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f',
    title: 'Dune walk',
    slug: 'dune-walk',
    media: {
      storage_path: 'images/instagram-1.jpg',
    },
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders banner when data is fetched', async () => {
    vi.mocked(getBanner).mockResolvedValue(mockBanner);

    renderWithQueryClient(
      <MemoryRouter>
        <Banner slug={mockSlug} layout="overlay" />
      </MemoryRouter>
    );

    const title = await screen.findByRole('heading', { name: /dune walk/i });
    expect(title).toBeInTheDocument();
  });

  test('renders error message if no banner found', async () => {
    vi.mocked(getBanner).mockResolvedValue(null);

    renderWithQueryClient(
      <MemoryRouter>
        <Banner slug={mockSlug} layout="overlay" />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no banner found/i);
    expect(message).toBeInTheDocument();
  });
});
