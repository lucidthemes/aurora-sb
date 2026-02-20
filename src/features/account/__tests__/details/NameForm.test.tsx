import { screen, fireEvent, waitFor } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import NameForm from '../../components/details/NameForm';

describe('NameForm component', () => {
  const mockLoggedInUser: User = {
    id: '11111111-1111-1111-1111-111111111111',
    aud: 'authenticated',
    email: 'test@example.com',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {
      email: 'example@email.com',
      email_verified: false,
      phone_verified: false,
      sub: '11111111-1111-1111-1111-111111111111',
    },
    created_at: '2026-01-01T00:00:00Z',
  };

  const handleNameEditShowMock = vi.fn();

  const setNameFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and submit button', () => {
    renderWithQueryClient(
      <NameForm user={mockLoggedInUser} handleNameEditShow={handleNameEditShowMock} setNameFormNotification={setNameFormNotificationMock} />
    );

    expect(screen.getByRole('form', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('shows error message for missing first name', async () => {
    renderWithQueryClient(
      <NameForm user={mockLoggedInUser} handleNameEditShow={handleNameEditShowMock} setNameFormNotification={setNameFormNotificationMock} />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a first name/i)).toBeInTheDocument();
    });
  });

  test('shows error message for missing last name', async () => {
    renderWithQueryClient(
      <NameForm user={mockLoggedInUser} handleNameEditShow={handleNameEditShowMock} setNameFormNotification={setNameFormNotificationMock} />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a last name/i)).toBeInTheDocument();
    });
  });
});
