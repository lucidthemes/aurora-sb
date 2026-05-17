import { waitFor } from '@testing-library/react';

vi.mock('../server/getPost', () => ({
  getPost: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import { getPost } from '../server/getPost';
import useSinglePost from '../useSinglePost';
import type { Post } from '../schemas/post.schema';

describe('useSinglePost hook', () => {
  const mockPostslug = 'dune-walk';

  const mockPost: Post = {
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
      storage_path: 'images/instagram-1.jpg',
      alt_text: 'Instagram 1',
    },
    categories: [
      {
        id: '134368fa-d7f4-4010-9618-d0e8625cf013',
        name: 'Travel',
        slug: 'travel',
      },
    ],
    tags: [
      {
        id: '1f2ed260-7616-49ee-8d0a-bccc5aa7b254',
        name: 'Beach',
        slug: 'beach',
      },
    ],
    related: [
      {
        id: 'bfb70be6-1225-4ac5-b738-f4e72192132c',
        title: 'Old Town Centre',
        slug: 'old-town-centre',
        media: {
          storage_path: 'images/instagram-2.jpg',
          alt_text: 'Instagram 2',
        },
        created_at: '2026-05-11T09:42:39.000Z',
      },
    ],
    comments: [
      {
        id: 'c1eea15a-eb0d-4651-a03d-5c5e452a1017',
        reply_to: null,
        name: 'Lucid Themes',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
        status: 'approved',
        created_at: '2026-05-12T10:39:52.005Z',
      },
    ],
    content: null,
    status: 'published',
    created_at: '2026-05-11T11:48:39.870Z',
    updated_at: '2026-05-11T11:48:39.870Z',
    options: {
      header: {
        layout: 'outside-above',
        besideSidebar: true,
      },
      sidebar: 'right',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches single post data', async () => {
    vi.mocked(getPost).mockResolvedValue(mockPost);

    const { result } = renderHookWithQueryClient(() => useSinglePost(mockPostslug));

    expect(getPost).toHaveBeenCalledWith(mockPostslug);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockPost);
    });
  });
});
