import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useRegisterForm from '../hooks/useRegisterForm';

describe('useRegisterForm hook', () => {
  test('updates form errors for missing fields', async () => {
    const { result } = renderHookWithQueryClient(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', '');
      result.current.setValue('password', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for invalid email', async () => {
    const { result } = renderHookWithQueryClient(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates form errors for password less than 8 characters', async () => {
    const { result } = renderHookWithQueryClient(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('password', 'pass');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for passwords that do no match', async () => {
    const { result } = renderHookWithQueryClient(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('password', 'password1');
      result.current.setValue('confirmPassword', 'password2');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.confirmPassword?.message).toBe('Passwords do not match');
  });
});
