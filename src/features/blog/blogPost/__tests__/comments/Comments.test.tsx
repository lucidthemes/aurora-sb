import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import type { PostComment } from '../../schemas/comment.schema';

import BlogPostComments from '../../components/comments';

describe('BlogPostComments component', () => {
  const mockPostId = 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f';

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
      reply_to: '21d9e560-d6f6-47f9-be49-e29f0612ce8c',
      name: 'Lucid Themes',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      created_at: '2026-05-14T12:04:28.128Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders comments list when data is fetched', async () => {
    renderWithQueryClient(<BlogPostComments postId={mockPostId} comments={mockComments} />);

    const commentsList = await screen.findByRole('list', { name: /comments/i });
    expect(commentsList).toBeInTheDocument();

    const commentItems = await screen.findAllByRole('listitem');
    expect(commentItems).toHaveLength(3);
  });

  test('renders form input fields and submit button', async () => {
    renderWithQueryClient(<BlogPostComments postId={mockPostId} comments={mockComments} />);

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add comment/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /comment/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /post comment/i })).toBeInTheDocument();
    });
  });

  test('shows form error messages for missing fields', async () => {
    renderWithQueryClient(<BlogPostComments postId={mockPostId} comments={mockComments} />);

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add comment/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /post comment/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a comment/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a name/i)).toBeInTheDocument();
    });
  });
});
