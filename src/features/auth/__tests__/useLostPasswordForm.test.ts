import { renderHook, act, waitFor } from '@testing-library/react';

import useLostPasswordForm from '../hooks/useLostPasswordForm';

describe('useLostPasswordForm hook', () => {
  test('updates form error for missing email', async () => {
    const { result } = renderHook(() => useLostPasswordForm());

    await act(async () => {
      result.current.setValue('email', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates form error for invalid email', async () => {
    const { result } = renderHook(() => useLostPasswordForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('resets form data and shows notification on valid form submission', async () => {
    const { result } = renderHook(() => useLostPasswordForm());

    await act(async () => {
      result.current.setValue('email', 'test@example.com');

      await result.current.handleSubmit(result.current.onSubmit)();
    });

    await waitFor(() => {
      expect(result.current.lostPasswordFormNotification).toEqual({
        type: 'success',
        message: 'Password reset email sent. Please check your inbox.',
      });
    });
  });
});
