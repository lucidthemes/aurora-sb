import { act } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useEmailForm from '../../hooks/details/useEmailForm';

describe('useEmailForm hook', () => {
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

  test('updates error for missing email', async () => {
    const { result } = renderHookWithQueryClient(() => useEmailForm(mockLoggedInUser, handleEmailEditShowMock, setEmailFormNotificationMock));

    await act(async () => {
      result.current.setValue('email', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates error for invalid email', async () => {
    const { result } = renderHookWithQueryClient(() => useEmailForm(mockLoggedInUser, handleEmailEditShowMock, setEmailFormNotificationMock));

    await act(async () => {
      result.current.setValue('email', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });
});
