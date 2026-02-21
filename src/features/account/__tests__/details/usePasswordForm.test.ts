import { act } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import usePasswordForm from '../../hooks/details/usePasswordForm';

describe('usePasswordForm hook', () => {
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

  const handlePasswordEditShowMock = vi.fn();

  const setPasswordFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates form errors for missing fields', async () => {
    const { result } = renderHookWithQueryClient(() => usePasswordForm(mockLoggedInUser, handlePasswordEditShowMock, setPasswordFormNotificationMock));

    await act(async () => {
      result.current.setValue('password', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for password less than 8 characters', async () => {
    const { result } = renderHookWithQueryClient(() => usePasswordForm(mockLoggedInUser, handlePasswordEditShowMock, setPasswordFormNotificationMock));

    await act(async () => {
      result.current.setValue('password', 'pass');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for passwords that do no match', async () => {
    const { result } = renderHookWithQueryClient(() => usePasswordForm(mockLoggedInUser, handlePasswordEditShowMock, setPasswordFormNotificationMock));

    await act(async () => {
      result.current.setValue('password', 'password1');
      result.current.setValue('confirmPassword', 'password2');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.confirmPassword?.message).toBe('Passwords do not match');
  });
});
