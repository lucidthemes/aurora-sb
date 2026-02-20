import { act } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useNameForm from '../../hooks/details/useNameForm';

describe('useNameForm hook', () => {
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

  test('updates error for missing first name', async () => {
    const { result } = renderHookWithQueryClient(() => useNameForm(mockLoggedInUser, handleNameEditShowMock, setNameFormNotificationMock));

    await act(async () => {
      result.current.setValue('firstName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.firstName?.message).toBe('Please enter a first name');
  });

  test('updates error for missing last name', async () => {
    const { result } = renderHookWithQueryClient(() => useNameForm(mockLoggedInUser, handleNameEditShowMock, setNameFormNotificationMock));

    await act(async () => {
      result.current.setValue('lastName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.lastName?.message).toBe('Please enter a last name');
  });
});
