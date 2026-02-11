import { act } from '@testing-library/react';

import useLoginForm from '../hooks/useLoginForm';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

describe('useLoginForm hook', () => {
  test('updates form errors for missing fields', async () => {
    const { result } = renderHookWithQueryClient(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', '');
      result.current.setValue('password', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for invalid email', async () => {
    const { result } = renderHookWithQueryClient(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates form errors for password less than 8 characters', async () => {
    const { result } = renderHookWithQueryClient(() => useLoginForm());

    await act(async () => {
      result.current.setValue('password', 'pass');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });
});
