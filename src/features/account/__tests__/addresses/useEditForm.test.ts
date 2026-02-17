import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useEditForm from '../../hooks/addresses/useEditForm';

describe('useEditForm hook', () => {
  const handleShippingEditShowMock = vi.fn();

  const handleBillingEditShowMock = vi.fn();

  const setShippingFormNotificationMock = vi.fn();

  const setBillingFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates errors for missing shipping address fields', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useEditForm('shipping', handleShippingEditShowMock, handleBillingEditShowMock, setShippingFormNotificationMock, setBillingFormNotificationMock)
    );

    await act(async () => {
      result.current.setValue('firstName', '');
      result.current.setValue('lastName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.firstName?.message).toBe('Please enter a first name');
    expect(result.current.errors.lastName?.message).toBe('Please enter a last name');
  });

  test('updates errors for missing billing address fields', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useEditForm('billing', handleShippingEditShowMock, handleBillingEditShowMock, setShippingFormNotificationMock, setBillingFormNotificationMock)
    );

    await act(async () => {
      result.current.setValue('firstName', '');
      result.current.setValue('lastName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.firstName?.message).toBe('Please enter a first name');
    expect(result.current.errors.lastName?.message).toBe('Please enter a last name');
  });
});
