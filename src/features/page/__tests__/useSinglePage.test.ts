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
    content: [
      {
        id: '6dd1f30b-5b4b-4349-b2d4-59ac27c8e4e9',
        type: 'paragraph',
        attributes: {
          align: {
            type: 'plain-text',
            value: 'left',
          },
          width: {
            type: 'plain-text',
            value: 'standard',
          },
          content: {
            type: 'rich-text',
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id volutpat quam iaculis eu. Nunc sit amet scelerisque mauris. Phasellus volutpat mauris ac sem tincidunt, in fringilla arcu ultrices. Phasellus scelerisque eros vel pulvinar gravida. Aenean suscipit felis orci, sed egestas libero dignissim at. Sed commodo malesuada ligula, nec vehicula risus fermentum sed.',
          },
        },
      },
      {
        id: '5f1e7646-862d-4629-aeb7-52edf9653093',
        type: 'pullquote',
        attributes: {
          cite: {
            type: 'rich-text',
            value: 'Lucid Themes',
          },
          align: {
            type: 'plain-text',
            value: 'left',
          },
          width: {
            type: 'plain-text',
            value: 'standard',
          },
          content: {
            type: 'rich-text',
            value:
              'Integer commodo, sem eget maximus dapibus, ipsum mi ultrices lacus, sit amet hendrerit nibh felis gravida ipsum. Phasellus et congue lacus. Etiam tristique lectus at leo aliquam pellentesque. Duis vel augue eget augue hendrerit aliquam, Cras eleifend magna tellus.',
          },
        },
      },
    ],
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
