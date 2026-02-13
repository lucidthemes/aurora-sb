import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useResetPasswordForm from '../hooks/useResetPasswordForm';

describe('useResetPasswordForm hook', () => {
  test('updates form error for missing password', async () => {
    const { result } = renderHookWithQueryClient(() => useResetPasswordForm());

    await act(async () => {
      result.current.setValue('password', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form error for password less than 8 characters', async () => {
    const { result } = renderHookWithQueryClient(() => useResetPasswordForm());

    await act(async () => {
      result.current.setValue('password', 'pass');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });
});
