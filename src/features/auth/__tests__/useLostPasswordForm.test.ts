import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useLostPasswordForm from '../hooks/useLostPasswordForm';

describe('useLostPasswordForm hook', () => {
  test('updates form error for missing email', async () => {
    const { result } = renderHookWithQueryClient(() => useLostPasswordForm());

    await act(async () => {
      result.current.setValue('email', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates form error for invalid email', async () => {
    const { result } = renderHookWithQueryClient(() => useLostPasswordForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });
});
