import { waitFor } from '@testing-library/react';

vi.mock('../../Posts/getPosts', () => ({
  getPostsWidgetPosts: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import usePostsWidget from '../../Posts/usePosts';
import { getPostsWidgetPosts } from '../../Posts/getPosts';
import type { PostsWidgetPost } from '../../Posts/posts.schema';

describe('usePostsWidget hook', () => {
  const mockLimit = 3;

  const mockPosts: PostsWidgetPost[] = [
    {
      id: 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f',
      title: 'Dune walk',
      slug: 'dune-walk',
      media: {
        storage_path: 'images/dune-walk.jpg',
        alt_text: 'Dune walk',
      },
      created_at: '2026-05-11T11:00:00+00:00',
    },
    {
      id: 'bfb70be6-1225-4ac5-b738-f4e72192132c',
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      media: {
        storage_path: 'images/old-town-centre.jpg',
        alt_text: 'Old Town Centre',
      },
      created_at: '2026-05-11T10:00:00+00:00',
    },
    {
      id: '42335c3a-d1bf-458b-8039-f23aca8f825b',
      title: 'Beach Adventure',
      slug: 'beach-adventure',
      media: {
        storage_path: 'images/beach-adventure.jpg',
        alt_text: 'Beach Adventure',
      },
      created_at: '2026-05-11T09:00:00+00:00',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches posts data and sets posts state', async () => {
    vi.mocked(getPostsWidgetPosts).mockResolvedValue(mockPosts);

    const { result } = renderHookWithQueryClient(() => usePostsWidget(mockLimit));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockPosts);
      expect(result.current.data).toHaveLength(3);
    });

    expect(getPostsWidgetPosts).toHaveBeenCalledWith(mockLimit);
  });
});
