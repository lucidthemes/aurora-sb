import { act, waitFor } from '@testing-library/react';

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerById: vi.fn(),
}));

import { getCustomerById } from '@server/shop/getCustomer';
import type { Customer } from '@schemas/shop/customer.schema';
import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useAddresses from '../../hooks/addresses/useAddresses';

describe('useAddresses hook', () => {
  const mockUserId = '11111111-1111-1111-1111-111111111111';

  const mockAddressesQuery: Customer = {
    first_name: 'Matthew',
    last_name: 'James',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('changes shipping address edit form to be shown when edit button is clicked', async () => {
    vi.mocked(getCustomerById).mockResolvedValue(mockAddressesQuery);

    const { result } = renderHookWithQueryClient(() => useAddresses(mockUserId));

    expect(result.current.shippingEditShow).toEqual(false);

    act(() => {
      result.current.handleShippingEditShow();
    });

    await waitFor(() => {
      expect(result.current.shippingEditShow).toEqual(true);
    });
  });

  test('changes billing address edit form to be shown when edit button is clicked', async () => {
    vi.mocked(getCustomerById).mockResolvedValue(mockAddressesQuery);

    const { result } = renderHookWithQueryClient(() => useAddresses(mockUserId));

    expect(result.current.billingEditShow).toEqual(false);

    act(() => {
      result.current.handleBillingEditShow();
    });

    await waitFor(() => {
      expect(result.current.billingEditShow).toEqual(true);
    });
  });
});
