import { screen, fireEvent, waitFor } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import EmailForm from '../../components/details/EmailForm';

describe('EmailForm component', () => {
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

  const handleEmailEditShowMock = vi.fn();

  const setEmailFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and submit button', () => {
    renderWithQueryClient(
      <EmailForm user={mockLoggedInUser} handleEmailEditShow={handleEmailEditShowMock} setEmailFormNotification={setEmailFormNotificationMock} />
    );

    expect(screen.getByRole('form', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('shows error message for missing email', async () => {
    renderWithQueryClient(
      <EmailForm user={mockLoggedInUser} handleEmailEditShow={handleEmailEditShowMock} setEmailFormNotification={setEmailFormNotificationMock} />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows error message for invalid email', async () => {
    renderWithQueryClient(
      <EmailForm user={mockLoggedInUser} handleEmailEditShow={handleEmailEditShowMock} setEmailFormNotification={setEmailFormNotificationMock} />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });
});
