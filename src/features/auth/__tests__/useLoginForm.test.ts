import { renderHook, act, waitFor } from '@testing-library/react';

import useLoginForm from '../hooks/useLoginForm';

vi.mock('@contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerByEmail: vi.fn(),
}));

import { useAuthContext } from '@contexts/AuthContext';
import { getCustomerByEmail } from '@server/shop/getCustomer';

describe('useLoginForm hook', () => {
  const handleLoginMock = vi.fn();

  vi.mocked(useAuthContext).mockReturnValue({
    handleLogin: handleLoginMock,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates form errors for missing fields', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', '');
      result.current.setValue('password', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for invalid email', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates form errors for password less than 8 characters', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('password', 'pass');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form notification for user that does not exist on form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(null);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('password', 'password');

      await result.current.handleSubmit(result.current.onSubmit)();
    });

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleLoginMock).not.toHaveBeenCalled();

      expect(result.current.loginFormNotification).toEqual({
        type: 'error',
        message: 'No account found with those details',
      });
    });
  });
});
