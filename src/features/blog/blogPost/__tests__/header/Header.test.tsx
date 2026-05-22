import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import type { Post } from '../../schemas/post.schema';

import BlogPostHeader from '../../components/header';

describe('BlogPostHeader component', () => {
  const mockPost: Partial<Post> = {
    id: 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f',
    title: 'Dune walk',
    slug: 'dune-walk',
    author: {
      id: '2ad9506e-0d94-4170-ac6b-399675b3fc7e',
      name: 'Lucid Themes',
      slug: 'lucid-themes',
      description:
        'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
    },
    media: {
      storage_path: 'images/dune-walk.jpg',
      alt_text: 'Dune walk',
    },
    categories: [
      {
        id: '134368fa-d7f4-4010-9618-d0e8625cf013',
        name: 'Travel',
        slug: 'travel',
      },
      {
        id: '87154118-0f2c-4ecb-8aac-d30db2f84531',
        name: 'Fashion',
        slug: 'fashion',
      },
    ],
    content: null,
    status: 'published',
    created_at: '2026-05-11T11:48:39.870Z',
    updated_at: '2026-05-11T11:48:39.870Z',
    options: {
      header: {
        show: true,
        layout: 'outside-above',
        besideSidebar: true,
      },
      sidebar: {
        show: true,
        option: 'sidebar-1',
        position: 'right',
      },
    },
  };

  test('renders title', () => {
    render(
      <MemoryRouter>
        <BlogPostHeader post={mockPost as Post} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /dune walk/i })).toBeInTheDocument();
  });

  test('renders categories', () => {
    render(
      <MemoryRouter>
        <BlogPostHeader post={mockPost as Post} />
      </MemoryRouter>
    );

    const categories = screen.getAllByRole('listitem');
    expect(categories).toHaveLength(2);

    expect(screen.getByRole('link', { name: /fashion/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /fashion/i })).toHaveAttribute('href', '/category/fashion');

    expect(screen.getByRole('link', { name: /travel/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /travel/i })).toHaveAttribute('href', '/category/travel');
  });

  test('renders author', () => {
    render(
      <MemoryRouter>
        <BlogPostHeader post={mockPost as Post} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /lucid themes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /lucid themes/i })).toHaveAttribute('href', '/author/lucid-themes');
  });

  test('renders date', () => {
    render(
      <MemoryRouter>
        <BlogPostHeader post={mockPost as Post} />
      </MemoryRouter>
    );

    expect(screen.getByText(/11 may 2026/i)).toBeInTheDocument();
  });

  test('renders image', () => {
    render(
      <MemoryRouter>
        <BlogPostHeader post={mockPost as Post} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /dune walk/i })).toBeInTheDocument();
  });
});
