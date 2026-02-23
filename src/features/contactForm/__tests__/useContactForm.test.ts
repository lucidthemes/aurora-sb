import { renderHook, act, waitFor } from '@testing-library/react';

import useContactForm from '../useContactForm';

describe('useContactForm hook', () => {
  test('updates form errors for missing fields', async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      result.current.setValue('name', '');
      result.current.setValue('email', '');
      result.current.setValue('subject', '');
      result.current.setValue('message', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.name?.message).toBe('Please enter a name');
    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
    expect(result.current.errors.subject?.message).toBe('Please enter a subject');
    expect(result.current.errors.message?.message).toBe('Please enter a message');
  });

  test('updates email form error for invalid email', async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      result.current.setValue('name', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('sets success notification type for valid form submission', async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('subject', 'Test subject');
      result.current.setValue('message', 'Test message');

      await result.current.handleSubmit(result.current.onSubmit)();
    });

    await waitFor(() => {
      expect(result.current.contactFormNotification).toEqual({
        type: 'success',
        message: 'Your message has successfully been sent',
      });
    });
  });
});
