import { waitFor } from '@testing-library/react';

vi.mock('../../Tags/getTags', () => ({
  getTagsWidgetTags: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import { getTagsWidgetTags } from '../../Tags/getTags';
import type { TagsWidgetTag } from '../../Tags/tags.schema';
import useTagsWidget from '@components/Widgets/Tags/useTags';

describe('useTagsWidget hook', () => {
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

  test('fetches tags widget data', async () => {
    vi.mocked(getTagsWidgetTags).mockResolvedValue(mockTags);

    const { result } = renderHookWithQueryClient(() => useTagsWidget(mockLimit));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockTags);
      expect(result.current.data).toHaveLength(4);
    });

    expect(getTagsWidgetTags).toHaveBeenCalledWith(mockLimit);
  });
});
