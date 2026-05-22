import { waitFor } from '@testing-library/react';

vi.mock('../server/getTaxonomy', () => ({
  getTaxonomy: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useBlogListTaxonomy from '../hooks/useBlogListTaxonomy';
import { getTaxonomy } from '../server/getTaxonomy';
import type { PostTaxonomy } from '../schemas/taxonomy.schema';

describe('useBlogListTaxonomy hook', () => {
  const mockTaxonomy = 'category';

  const mockSlug = 'photography';

  const mockBlogListTaxonomy: PostTaxonomy = {
    id: '4cf53dbf-5723-43fa-8bc7-6ad39bc0603f',
    name: 'Photography',
    slug: 'photography',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches taxonomy data', async () => {
    vi.mocked(getTaxonomy).mockResolvedValue(mockBlogListTaxonomy);

    const { result } = renderHookWithQueryClient(() => useBlogListTaxonomy({ taxonomy: mockTaxonomy, slug: mockSlug }));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBlogListTaxonomy);
    });

    expect(getTaxonomy).toHaveBeenCalledWith({ taxonomy: mockTaxonomy, slug: mockSlug });
  });
});
