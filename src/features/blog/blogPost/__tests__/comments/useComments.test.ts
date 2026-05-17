import { renderHook, waitFor } from '@testing-library/react';

import useComments from '../../components/comments/hooks/useComments';
import type { PostComment } from '../../schemas/comment.schema';

describe('useComments hook', () => {
  const mockComments: PostComment[] = [
    {
      id: 'c1eea15a-eb0d-4651-a03d-5c5e452a1017',
      reply_to: null,
      name: 'Lucid Themes',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      created_at: '2026-05-12T10:39:52.005Z',
    },
    {
      id: '21d9e560-d6f6-47f9-be49-e29f0612ce8c',
      reply_to: 'c1eea15a-eb0d-4651-a03d-5c5e452a1017',
      name: 'Lucid Themes',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      created_at: '2026-05-13T14:55:32.005Z',
    },
    {
      id: '238c6654-0e03-475a-b67a-0edeb7d7086f',
      reply_to: null,
      name: 'Lucid Themes',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      created_at: '2026-05-14T12:04:28.128Z',
    },
  ];

  const mockCommentsList: PostComment[] = [
    {
      id: 'c1eea15a-eb0d-4651-a03d-5c5e452a1017',
      reply_to: null,
      name: 'Lucid Themes',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      created_at: '2026-05-12T10:39:52.005Z',
      replies: [
        {
          id: '21d9e560-d6f6-47f9-be49-e29f0612ce8c',
          reply_to: 'c1eea15a-eb0d-4651-a03d-5c5e452a1017',
          name: 'Lucid Themes',
          comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
          status: 'approved',
          created_at: '2026-05-13T14:55:32.005Z',
          replies: [],
        },
      ],
    },
    {
      id: '238c6654-0e03-475a-b67a-0edeb7d7086f',
      reply_to: null,
      name: 'Lucid Themes',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      created_at: '2026-05-14T12:04:28.128Z',
      replies: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sorts comments into list with replies', async () => {
    const { result } = renderHook(() => useComments({ comments: mockComments }));

    await waitFor(() => {
      expect(result.current.commentsList).toEqual(mockCommentsList);
    });
  });

  test('calculates comments count', async () => {
    const { result } = renderHook(() => useComments({ comments: mockComments }));

    await waitFor(() => {
      expect(result.current.commentsCount).toBe(3);
    });
  });
});
