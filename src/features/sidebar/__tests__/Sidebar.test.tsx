import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../getSidebar', () => ({
  getSidebar: vi.fn(),
}));

import { renderWithQueryClient } from '@utils/tests/queryClient';

import Sidebar from '../Sidebar';
import { getSidebar } from '../getSidebar';
import type { Sidebar as SidebarType } from '../schemas/sidebar.schema';

describe('Sidebar component', () => {
  const mockName = 'sidebar-1';

  const mockTitle = 'Sidebar 1';

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

  test('renders sidebar when data is fetched', async () => {
    vi.mocked(getSidebar).mockResolvedValue(mockSidebar);

    renderWithQueryClient(
      <MemoryRouter>
        <Sidebar name={mockName} />
      </MemoryRouter>
    );

    const sidebar = await screen.findByLabelText(mockTitle);
    expect(sidebar).toBeInTheDocument();

    const aboutWidgetHeading = await within(sidebar).findByRole('heading', { name: /lucid themes/i });
    expect(aboutWidgetHeading).toBeInTheDocument();

    const postsWidgetHeading = await within(sidebar).findByRole('heading', { name: /latest posts/i });
    expect(postsWidgetHeading).toBeInTheDocument();

    const instagramWidgetHeading = await within(sidebar).findByRole('heading', { name: /instagram/i });
    expect(instagramWidgetHeading).toBeInTheDocument();

    const socialWidgetHeading = await within(sidebar).findByRole('heading', { name: /follow me/i });
    expect(socialWidgetHeading).toBeInTheDocument();

    const newsletterWidgetHeading = await within(sidebar).findByRole('heading', { name: /newsletter/i });
    expect(newsletterWidgetHeading).toBeInTheDocument();

    const promoBoxWidgetHeading = await within(sidebar).findByRole('heading', { name: /promo box/i });
    expect(promoBoxWidgetHeading).toBeInTheDocument();

    const searchWidgetHeading = await within(sidebar).findByRole('heading', { name: /search/i });
    expect(searchWidgetHeading).toBeInTheDocument();

    const tagsWidgetHeading = await within(sidebar).findByRole('heading', { name: /tags/i });
    expect(tagsWidgetHeading).toBeInTheDocument();
  });

  test('renders error message if no sidebar found', async () => {
    vi.mocked(getSidebar).mockResolvedValue(null);

    renderWithQueryClient(
      <MemoryRouter>
        <Sidebar name={mockName} />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no sidebar found/i);
    expect(message).toBeInTheDocument();
  });
});
