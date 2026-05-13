import { waitFor } from '@testing-library/react';

vi.mock('../../components/navigation/getNavigation', () => ({
  getNavigation: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import { getNavigation } from '../../components/navigation/getNavigation';
import useNavigation from '../../components/navigation/useNavigation';
import type { Navigation } from '../../components/navigation/navigation.schema';

describe('useNavigation hook', () => {
  const mockPostId = 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f';

  const mockCreatedDate = '2026-05-11 11:48:39.870294+00';

  const mockPreviousPost: Navigation = {
    title: 'Old Town Centre',
    slug: 'old-town-centre',
  };

  const mockNextPost: Navigation = {
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches previous post data', async () => {
    vi.mocked(getNavigation).mockResolvedValue({ previousPost: mockPreviousPost });

    const { result } = renderHookWithQueryClient(() => useNavigation({ postId: mockPostId, createdDate: mockCreatedDate }));

    expect(getNavigation).toHaveBeenCalledWith(mockCreatedDate);

    await waitFor(() => {
      expect(result.current.data?.previousPost).toEqual(mockPreviousPost);
    });
  });

  test('fetches next post data', async () => {
    vi.mocked(getNavigation).mockResolvedValue({ nextPost: mockNextPost });

    const { result } = renderHookWithQueryClient(() => useNavigation({ postId: mockPostId, createdDate: mockCreatedDate }));

    expect(getNavigation).toHaveBeenCalledWith(mockCreatedDate);

    await waitFor(() => {
      expect(result.current.data?.nextPost).toEqual(mockNextPost);
    });
  });
});
