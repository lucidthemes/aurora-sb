import { act } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useEditForm from '../../hooks/addresses/useEditForm';

describe('useEditForm hook', () => {
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

  const handleShippingEditShowMock = vi.fn();

  const handleBillingEditShowMock = vi.fn();

  const setShippingFormNotificationMock = vi.fn();

  const setBillingFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates errors for missing shipping address fields', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useEditForm(
        mockLoggedInUser,
        'shipping',
        handleShippingEditShowMock,
        handleBillingEditShowMock,
        setShippingFormNotificationMock,
        setBillingFormNotificationMock
      )
    );

    await act(async () => {
      result.current.setValue('firstName', '');
      result.current.setValue('lastName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.firstName?.message).toBe('Please enter a first name');
    expect(result.current.errors.lastName?.message).toBe('Please enter a last name');
  });

  test('updates errors for missing billing address fields', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useEditForm(
        mockLoggedInUser,
        'billing',
        handleShippingEditShowMock,
        handleBillingEditShowMock,
        setShippingFormNotificationMock,
        setBillingFormNotificationMock
      )
    );

    await act(async () => {
      result.current.setValue('firstName', '');
      result.current.setValue('lastName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.firstName?.message).toBe('Please enter a first name');
    expect(result.current.errors.lastName?.message).toBe('Please enter a last name');
  });
});
