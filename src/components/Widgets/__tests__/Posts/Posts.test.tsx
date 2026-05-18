import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../Posts/getPosts', () => ({
  getPostsWidgetPosts: vi.fn(),
}));

import { renderWithQueryClient } from '@utils/tests/queryClient';

import PostsWidget from '../../Posts/Posts';
import { getPostsWidgetPosts } from '../../Posts/getPosts';
import type { PostsWidgetPost } from '../../Posts/posts.schema';

describe('PostsWidget component', () => {
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

  test('renders posts widget when posts data is fetched', async () => {
    vi.mocked(getPostsWidgetPosts).mockResolvedValue(mockPosts);

    renderWithQueryClient(
      <MemoryRouter>
        <PostsWidget title="Latest posts" limit={mockLimit} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /latest posts/i });
    expect(heading).toBeInTheDocument();

    const posts = await screen.findAllByRole('listitem');
    expect(posts).toHaveLength(3);
  });

  test('renders post information', async () => {
    vi.mocked(getPostsWidgetPosts).mockResolvedValue(mockPosts);

    renderWithQueryClient(
      <MemoryRouter>
        <PostsWidget title="Latest posts" limit={mockLimit} />
      </MemoryRouter>
    );

    const postsList = await screen.findByRole('list', { name: /widget posts/i });
    expect(postsList).toBeInTheDocument();

    const firstListItem = postsList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /dune walk/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /dune walk/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/11 may 2026/i)).toBeInTheDocument();
  });

  test('renders error message if no posts found', async () => {
    vi.mocked(getPostsWidgetPosts).mockResolvedValue(null);

    renderWithQueryClient(
      <MemoryRouter>
        <PostsWidget title="Latest posts" limit={mockLimit} />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no posts found/i);
    expect(message).toBeInTheDocument();
  });
});
