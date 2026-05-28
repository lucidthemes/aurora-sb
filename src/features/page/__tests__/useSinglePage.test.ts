import { waitFor } from '@testing-library/react';

vi.mock('../getPage', () => ({
  getPage: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useSinglePage from '../useSinglePage';
import { getPage } from '../getPage';
import type { Page } from '../page.schema';

describe('useSinglePage hook', () => {
  const mockSlug = 'about';

  const mockPage: Page = {
    title: 'About',
    content: null,
    options: {
      sidebar: {
        show: true,
        option: 'sidebar-1',
        position: 'right',
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches page data', async () => {
    vi.mocked(getPage).mockResolvedValue(mockPage);

    const { result } = renderHookWithQueryClient(() => useSinglePage(mockSlug));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockPage);
    });

    expect(getPage).toHaveBeenCalledWith(mockSlug);
  });
});
