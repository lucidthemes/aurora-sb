import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import type { Navigation } from '../../components/navigation/navigation.schema';
import BlogPostNavigationPrevious from '../../components/navigation/components/Previous';
import BlogPostNavigationNext from '../../components/navigation/components/Next';

describe('BlogPostNavigation component', () => {
  const mockPreviousPost: Navigation = {
    title: 'Old Town Centre',
    slug: 'old-town-centre',
  };

  const mockNextPost: Navigation = {
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  test('renders Previous post component', () => {
    render(
      <MemoryRouter>
        <BlogPostNavigationPrevious previousPost={mockPreviousPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(/previous post/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Old Town Centre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Old Town Centre/i })).toHaveAttribute('href', '/blog/old-town-centre');
  });

  test('renders Next post component', () => {
    render(
      <MemoryRouter>
        <BlogPostNavigationNext nextPost={mockNextPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(/next post/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dune walk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dune walk/i })).toHaveAttribute('href', '/blog/dune-walk');
  });
});
