import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../server/getPosts', () => ({
  getPosts: vi.fn(),
}));

import { renderWithQueryClient } from '@utils/tests/queryClient';

import BlogList from '../BlogList';
import { getPosts } from '../server/getPosts';
import type { Posts } from '../schemas/posts.schema';

Element.prototype.scrollIntoView = vi.fn();

describe('BlogList component', () => {
  const mockPosts: Posts[] = [
    {
      id: 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f',
      title: 'Dune walk',
      slug: 'dune-walk',
      author: {
        id: '2ad9506e-0d94-4170-ac6b-399675b3fc7e',
        name: 'Lucid Themes',
        slug: 'lucid-themes',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
      },
      media: {
        storage_path: 'images/dune-walk.jpg',
        alt_text: 'Dune walk',
      },
      categories: [
        {
          id: '87154118-0f2c-4ecb-8aac-d30db2f84531',
          name: 'Fashion',
          slug: 'fashion',
        },
        {
          id: '134368fa-d7f4-4010-9618-d0e8625cf013',
          name: 'Travel',
          slug: 'travel',
        },
      ],
      tags: [
        {
          id: 'fd46239c-7ef4-4c47-a400-57446fedf3da',
          name: 'Outdoors',
          slug: 'outdoors',
        },
        {
          id: '1f2ed260-7616-49ee-8d0a-bccc5aa7b254',
          name: 'Travel',
          slug: 'travel',
        },
        {
          id: 'aba8136e-12ab-42c9-b88b-ea65ff2ad89c',
          name: 'Lifestyle',
          slug: 'lifestyle',
        },
        {
          id: '6aa1dcbf-5058-4157-b8ec-381dce575e8f',
          name: 'Photography',
          slug: 'photography',
        },
      ],
      status: 'published',
      created_at: '2026-05-11T11:00:00+00:00',
      updated_at: '2026-05-11T11:48:39.870294+00:00',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
    },
    {
      id: 'bfb70be6-1225-4ac5-b738-f4e72192132c',
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      author: {
        id: '2ad9506e-0d94-4170-ac6b-399675b3fc7e',
        name: 'Lucid Themes',
        slug: 'lucid-themes',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
      },
      media: {
        storage_path: 'images/old-town-centre.jpg',
        alt_text: 'Old Town Centre',
      },
      categories: [
        {
          id: '4cf53dbf-5723-43fa-8bc7-6ad39bc0603f',
          name: 'Photography',
          slug: 'photography',
        },
      ],
      tags: [],
      status: 'published',
      created_at: '2026-05-11T10:00:00+00:00',
      updated_at: '2026-05-11T09:42:39+00:00',
      excerpt: null,
    },
    {
      id: '42335c3a-d1bf-458b-8039-f23aca8f825b',
      title: 'Beach Adventure',
      slug: 'beach-adventure',
      author: {
        id: '2ad9506e-0d94-4170-ac6b-399675b3fc7e',
        name: 'Lucid Themes',
        slug: 'lucid-themes',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
      },
      media: {
        storage_path: 'images/beach-adventure.jpg',
        alt_text: 'Beach Adventure',
      },
      categories: [
        {
          id: '134368fa-d7f4-4010-9618-d0e8625cf013',
          name: 'Travel',
          slug: 'travel',
        },
      ],
      tags: [],
      status: 'published',
      created_at: '2026-05-11T09:00:00+00:00',
      updated_at: '2026-05-14T14:40:20.695056+00:00',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
    },
  ];

  const mockPostsCount = mockPosts.length;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders list when posts data is fetched', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: mockPosts, postsCount: mockPostsCount });

    renderWithQueryClient(
      <MemoryRouter>
        <BlogList />
      </MemoryRouter>
    );

    const blogList = await screen.findByRole('list', { name: /blog posts/i });
    expect(blogList).toBeInTheDocument();

    const listItems = blogList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(3);
  });

  test('renders post information', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: mockPosts, postsCount: mockPostsCount });

    renderWithQueryClient(
      <MemoryRouter>
        <BlogList />
      </MemoryRouter>
    );

    const blogList = await screen.findByRole('list', { name: /blog posts/i });
    expect(blogList).toBeInTheDocument();

    const firstListItem = blogList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /dune walk/i })).toBeInTheDocument();

    const categories = await within(firstListItem).findAllByRole('listitem');
    expect(categories).toHaveLength(2);
    expect(within(firstListItem).getByRole('link', { name: /fashion/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /fashion/i })).toHaveAttribute('href', '/category/fashion');

    expect(within(firstListItem).getByRole('heading', { name: /dune walk/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('link', { name: /lucid themes/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /lucid themes/i })).toHaveAttribute('href', '/author/lucid-themes');

    expect(within(firstListItem).getByText(/11 may 2026/i)).toBeInTheDocument();

    expect(within(firstListItem).getByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument();

    expect(within(firstListItem).getByRole('link', { name: /read more/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /read more/i })).toHaveAttribute('href', '/blog/dune-walk');
  });

  test('renders pagination when posts data is fetched', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: mockPosts, postsCount: mockPostsCount });

    renderWithQueryClient(
      <MemoryRouter>
        <BlogList showPagination={true} postsPerPage={2} />
      </MemoryRouter>
    );

    const pagination = await screen.findByLabelText(/post pagination/i);
    expect(pagination).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });

  test('hides pagination when showPagination is set to false', async () => {
    vi.mocked(getPosts).mockResolvedValue({ posts: mockPosts, postsCount: mockPostsCount });

    renderWithQueryClient(
      <MemoryRouter>
        <BlogList showPagination={false} />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /blog posts/i });

    const pagination = screen.queryByLabelText(/post pagination/i);
    expect(pagination).not.toBeInTheDocument();
  });
});
