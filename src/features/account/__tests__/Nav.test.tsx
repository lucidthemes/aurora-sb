import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

import { useAuthContext } from '@contexts/AuthContext';

import Nav from '../components/Nav';

describe('Nav component', () => {
  const signOutMock = vi.fn();

  vi.mocked(useAuthContext).mockReturnValue({
    signOut: signOutMock,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/account');

    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /orders/i })).toHaveAttribute('href', '/account/orders');

    expect(screen.getByRole('link', { name: /addresses/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /addresses/i })).toHaveAttribute('href', '/account/addresses');

    expect(screen.getByRole('link', { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /details/i })).toHaveAttribute('href', '/account/details');

    expect(screen.getByRole('link', { name: /log out/i })).toBeInTheDocument();
  });

  test('logs user out after clicking log out link', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    const logoutLink = screen.getByRole('link', { name: /log out/i });
    expect(logoutLink).toBeInTheDocument();

    fireEvent.click(logoutLink);
    expect(signOutMock).toHaveBeenCalled();
  });
});
