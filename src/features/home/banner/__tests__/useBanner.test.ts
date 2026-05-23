import { waitFor } from '@testing-library/react';

vi.mock('../getBanner', () => ({
  getBanner: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useBanner from '../useBanner';
import { getBanner } from '../getBanner';
import type { Banner } from '../banner.schema';

describe('useBanner hook', () => {
  const mockSlug = 'dune-walk';

  const mockBanner: Banner = {
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

  test('fetches banner data', async () => {
    vi.mocked(getBanner).mockResolvedValue(mockBanner);

    const { result } = renderHookWithQueryClient(() => useBanner(mockSlug));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBanner);
    });

    expect(getBanner).toHaveBeenCalledWith(mockSlug);
  });
});
