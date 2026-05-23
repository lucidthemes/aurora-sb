import { waitFor } from '@testing-library/react';

vi.mock('../getSlideshow', () => ({
  getSlideshow: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useSlideshow from '../hooks/useSlideshow';
import { getSlideshow } from '../getSlideshow';
import type { Slideshow } from '../slideshow.schema';

describe('useSlideshow hook', () => {
  const mockSlides: Slideshow[] = [
    {
      id: 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f',
      title: 'Dune walk',
      slug: 'dune-walk',
      media: {
        storage_path: 'images/dune-walk.jpg',
      },
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
    },
    {
      id: 'bfb70be6-1225-4ac5-b738-f4e72192132c',
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      media: {
        storage_path: 'images/old-town-centre.jpg',
      },
      excerpt: null,
    },
    {
      id: '42335c3a-d1bf-458b-8039-f23aca8f825b',
      title: 'Beach Adventure',
      slug: 'beach-adventure',
      media: {
        storage_path: 'images/beach-adventure.jpg',
      },
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches slides data', async () => {
    vi.mocked(getSlideshow).mockResolvedValue(mockSlides);

    const { result } = renderHookWithQueryClient(() => useSlideshow({}));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockSlides);
    });
  });
});
