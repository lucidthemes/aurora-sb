import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BlogPostTags from '../../components/tags';
import type { PostTag } from '../../schemas/tag.schema';

describe('BlogPostTags component', () => {
  const mockTags: PostTag[] = [
    {
      id: '1f2ed260-7616-49ee-8d0a-bccc5aa7b254',
      name: 'Beach',
      slug: 'beach',
    },
    {
      id: 'aba8136e-12ab-42c9-b88b-ea65ff2ad89c',
      name: 'Dunes',
      slug: 'dunes',
    },
    {
      id: 'fd46239c-7ef4-4c47-a400-57446fedf3da',
      name: 'Outdoors',
      slug: 'outdoors',
    },
    {
      id: '6aa1dcbf-5058-4157-b8ec-381dce575e8f',
      name: 'Walk',
      slug: 'walk',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders tags when tag data is fetched', async () => {
    render(
      <MemoryRouter>
        <BlogPostTags tags={mockTags} />
      </MemoryRouter>
    );

    const tags = await screen.findByLabelText(/post tags/i);
    expect(tags).toBeInTheDocument();

    const tagsList = screen.getAllByRole('listitem');
    expect(tagsList).toHaveLength(4);
    expect(screen.getByRole('link', { name: /beach/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /beach/i })).toHaveAttribute('href', '/tag/beach');
  });

  test('renders nothing if post does not have tags', () => {
    const { container } = render(
      <MemoryRouter>
        <BlogPostTags tags={[]} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
