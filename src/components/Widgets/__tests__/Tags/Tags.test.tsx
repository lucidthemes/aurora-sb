import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../Tags/getTags', () => ({
  getTagsWidgetTags: vi.fn(),
}));

import { renderWithQueryClient } from '@utils/tests/queryClient';

import TagsWidget from '../../Tags/Tags';
import { getTagsWidgetTags } from '../../Tags/getTags';
import type { TagsWidgetTag } from '../../Tags/tags.schema';

describe('TagsWidget component', () => {
  const mockLimit = 4;

  const mockTags: TagsWidgetTag[] = [
    {
      id: '1f2ed260-7616-49ee-8d0a-bccc5aa7b254',
      name: 'Travel',
      slug: 'travel',
    },
    {
      id: '6aa1dcbf-5058-4157-b8ec-381dce575e8f',
      name: 'Photography',
      slug: 'photography',
    },
    {
      id: 'aba8136e-12ab-42c9-b88b-ea65ff2ad89c',
      name: 'Lifestyle',
      slug: 'lifestyle',
    },
    {
      id: 'fd46239c-7ef4-4c47-a400-57446fedf3da',
      name: 'Outdoors',
      slug: 'outdoors',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders tags widget when tags data is fetched', async () => {
    vi.mocked(getTagsWidgetTags).mockResolvedValue(mockTags);

    renderWithQueryClient(
      <MemoryRouter>
        <TagsWidget title="Tags" limit={mockLimit} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /tags/i });
    expect(heading).toBeInTheDocument();

    const tags = await screen.findAllByRole('listitem');
    expect(tags).toHaveLength(4);
  });

  test('renders tag information', async () => {
    vi.mocked(getTagsWidgetTags).mockResolvedValue(mockTags);

    renderWithQueryClient(
      <MemoryRouter>
        <TagsWidget title="Tags" limit={mockLimit} />
      </MemoryRouter>
    );

    const tagsList = await screen.findByRole('list', { name: /widget tags/i });
    expect(tagsList).toBeInTheDocument();

    const firstListItem = tagsList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('link', { name: /travel/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /travel/i })).toHaveAttribute('href', '/tag/travel');
  });

  test('renders error message if no tags found', async () => {
    vi.mocked(getTagsWidgetTags).mockResolvedValue(null);

    renderWithQueryClient(
      <MemoryRouter>
        <TagsWidget title="Tags" limit={mockLimit} />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no tags found/i);
    expect(message).toBeInTheDocument();
  });
});
