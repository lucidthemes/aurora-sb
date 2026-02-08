import { renderHook, act, waitFor } from '@testing-library/react';

import useRegisterForm from '../hooks/useRegisterForm';

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerByEmail: vi.fn(),
}));

import { getCustomerByEmail } from '@server/shop/getCustomer';

describe('useRegisterForm hook', () => {
  const handleRegisterMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates form errors for missing fields', async () => {
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', '');
      result.current.setValue('password', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for invalid email', async () => {
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates form errors for password less than 8 characters', async () => {
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('password', 'pass');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.password?.message).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for passwords that do no match', async () => {
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('password', 'password1');
      result.current.setValue('confirmPassword', 'password2');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.confirmPassword?.message).toBe('Passwords do not match');
  });

  test('updates form notification for user that already exists on form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue({ id: 1, email: 'test@example.com' });

    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('password', 'password');
      result.current.setValue('confirmPassword', 'password');

      await result.current.handleSubmit(result.current.onSubmit)();
    });

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleRegisterMock).not.toHaveBeenCalled();
      expect(result.current.registerFormNotification.type).toBe('error');
      expect(result.current.registerFormNotification.message).toBe('An account with this email address already exists');
    });
  });
});
