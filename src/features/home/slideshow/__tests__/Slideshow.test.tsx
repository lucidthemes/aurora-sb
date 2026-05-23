import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../getSlideshow', () => ({
  getSlideshow: vi.fn(),
}));

import { renderWithQueryClient } from '@utils/tests/queryClient';

import Slideshow from '../Slideshow';
import { getSlideshow } from '../getSlideshow';

describe('Slideshow component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders error message if no slideshow found', async () => {
    vi.mocked(getSlideshow).mockResolvedValue(null);

    renderWithQueryClient(
      <MemoryRouter>
        <Slideshow />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no slideshow found/i);
    expect(message).toBeInTheDocument();
  });
});
