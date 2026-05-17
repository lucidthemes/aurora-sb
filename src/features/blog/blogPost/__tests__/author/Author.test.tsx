import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BlogPostAuthor from '../../components/author';
import type { PostAuthor } from '../../schemas/author.schema';

describe('BlogPostAuthor component', () => {
  const mockAuthor: PostAuthor = {
    id: '2ad9506e-0d94-4170-ac6b-399675b3fc7e',
    name: 'Lucid Themes',
    slug: 'lucid-themes',
    description:
      'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
  };

  test('renders image', () => {
    render(
      <MemoryRouter>
        <BlogPostAuthor author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /lucid Themes/i })).toBeInTheDocument();
  });

  test('renders name', () => {
    render(
      <MemoryRouter>
        <BlogPostAuthor author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /lucid themes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /lucid Themes/i })).toHaveAttribute('href', '/author/lucid-themes');
  });

  test('renders bio', () => {
    render(
      <MemoryRouter>
        <BlogPostAuthor author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sed rhoncus/i)).toBeInTheDocument();
  });
});
