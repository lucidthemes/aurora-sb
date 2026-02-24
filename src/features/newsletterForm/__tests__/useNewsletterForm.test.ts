import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useNewsletterForm from '../useNewsletterForm';

describe('useNewsletterForm hook', () => {
  test('updates error for missing email', async () => {
    const { result } = renderHookWithQueryClient(() => useNewsletterForm());

    await act(async () => {
      result.current.setValue('email', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });

  test('updates error for invalid email', async () => {
    const { result } = renderHookWithQueryClient(() => useNewsletterForm());

    await act(async () => {
      result.current.setValue('email', 'invalid-email');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.email?.message).toBe('Please enter a valid email address');
  });
});
