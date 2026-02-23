import { renderHook, act, waitFor } from '@testing-library/react';

import useNewsletterForm from '../useNewsletterForm';

describe('useNewsletterForm hook', () => {
  test('updates error for missing email', async () => {
    const { result } = renderHook(() => useNewsletterForm());

    await act(async () => {
      result.current.setValue('email', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates error for invalid email', async () => {
    const { result } = renderHook(() => useNewsletterForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('sets success notification type for valid form submission', async () => {
    const { result } = renderHook(() => useNewsletterForm());

    await act(async () => {
      result.current.setValue('email', 'test@example.com');

      await result.current.handleSubmit(result.current.onSubmit)();
    });

    await waitFor(() => {
      expect(result.current.newsletterFormNotification).toEqual({
        type: 'success',
        message: 'Subscribed',
      });
    });
  });
});
