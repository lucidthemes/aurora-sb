import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BlogPostRelated from '../../components/related';
import type { PostRelated } from '../../schemas/related.schema';

describe('BlogPostRelated component', () => {
  const mockRelated: PostRelated[] = [
    { id: 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f', title: 'Dune walk', slug: 'dune-walk', media: null, created_at: '2026-05-11 11:48:39.870294+00' },
    {
      id: 'bfb70be6-1225-4ac5-b738-f4e72192132c',
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      media: null,
      created_at: '2026-05-11 11:48:39.870294+00',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders related posts when post data is fetched', async () => {
    render(
      <MemoryRouter>
        <BlogPostRelated related={mockRelated} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /you may also like/i });
    expect(heading).toBeInTheDocument();

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

  test('renders nothing if post does not have related posts', () => {
    const { container } = render(
      <MemoryRouter>
        <BlogPostRelated related={[]} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
