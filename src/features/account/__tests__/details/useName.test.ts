import { act, waitFor } from '@testing-library/react';

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerById: vi.fn(),
}));

import { getCustomerById } from '@server/shop/getCustomer';
import type { Customer } from '@schemas/shop/customer.schema';
import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useName from '../../hooks/details/useName';

describe('useName hook', () => {
  const mockUserId = '11111111-1111-1111-1111-111111111111';

  const mockDetailsNameQuery: Customer = {
    first_name: 'Matthew',
    last_name: 'James',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches first name and last name', async () => {
    vi.mocked(getCustomerById).mockResolvedValue(mockDetailsNameQuery);

    const { result } = renderHookWithQueryClient(() => useName(mockUserId));

    await waitFor(() => {
      expect(result.current.detailsNameQuery.data?.firstName).toEqual(mockDetailsNameQuery.first_name);
      expect(result.current.detailsNameQuery.data?.lastName).toEqual(mockDetailsNameQuery.last_name);
    });
  });

  test('changes name edit form to be shown when edit button is clicked', async () => {
    vi.mocked(getCustomerById).mockResolvedValue(mockDetailsNameQuery);

    const { result } = renderHookWithQueryClient(() => useName(mockUserId));

    expect(result.current.nameEditShow).toEqual(false);

    act(() => {
      result.current.handleNameEditShow();
    });

    await waitFor(() => {
      expect(result.current.nameEditShow).toEqual(true);
    });
  });
});
