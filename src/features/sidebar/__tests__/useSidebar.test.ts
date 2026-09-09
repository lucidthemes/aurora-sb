import { waitFor } from '@testing-library/react';

vi.mock('../getSidebar', () => ({
  getSidebar: vi.fn(),
}));

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useSidebar from '../useSidebar';
import { getSidebar } from '../getSidebar';
import type { Sidebar as SidebarType } from '../schemas/sidebar.schema';

describe('useSidebar hook', () => {
  const mockName = 'sidebar-1';

  const mockSidebar: SidebarType = {
    name: 'sidebar-1',
    title: 'Sidebar 1',
    widgets: [
      {
        id: 'a67f566e-34c4-4e17-9860-b27b1e085ad7',
        type: 'about',
        backgroundImage: 'images/instagram-1.jpg',
        authorImage: 'images/instagram-2.jpg',
        heading: 'Lucid Themes',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu',
        link: '/contact',
      },
      {
        id: '6aa1dcbf-5058-4157-b8ec-381dce575e8f',
        title: 'Latest posts',
        type: 'posts',
        limit: 2,
        style: 'wide',
        location: 'sidebar',
      },
      {
        id: '18524a6b-477e-482b-b278-d9f3666ac66c',
        title: 'Instagram',
        type: 'instagram',
        feedId: '6a0b506f-1717-434c-8333-f7f4e8f5bb1b',
      },
      {
        id: '2ad9506e-0d94-4170-ac6b-399675b3fc7e',
        title: 'Follow me',
        type: 'social',
      },
      {
        id: '85c9975a-c92d-4b4c-99fd-2149347b3d9e',
        title: 'Newsletter',
        type: 'newsletter',
      },
      {
        id: 'eccc782f-2088-4ca5-9c06-b145dd9bfa5c',
        title: 'Promo box',
        type: 'promoBox',
        image: 'images/instagram-1.jpg',
        heading: 'Lifestyle',
        link: '/category/lifestyle',
        position: 'center',
      },
      {
        id: 'c1eea15a-eb0d-4651-a03d-5c5e452a1017',
        title: 'Search',
        type: 'search',
      },
      {
        id: '92077e0d-018f-47c7-b2c8-2e95d8a3f319',
        title: 'Tags',
        type: 'tags',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches sidebar data', async () => {
    vi.mocked(getSidebar).mockResolvedValue(mockSidebar);

    const { result } = renderHookWithQueryClient(() => useSidebar(mockName));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockSidebar);
    });

    expect(getSidebar).toHaveBeenCalledWith(mockName);
  });
});
