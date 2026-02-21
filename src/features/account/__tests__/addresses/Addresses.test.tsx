import { screen } from '@testing-library/react';

vi.mock('@contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerById: vi.fn(),
}));

import { useAuthContext } from '@contexts/AuthContext';
import { getCustomerById } from '@server/shop/getCustomer';
import type { Customer } from '@schemas/shop/customer.schema';
import { renderWithQueryClient } from '@utils/tests/queryClient';

import Addresses from '../../components/addresses/Addresses';

describe('Addresses component', () => {
  const mockAddressesQueryNoAddresses: Customer = {
    first_name: 'Matthew',
    last_name: 'James',
  };

  vi.mocked(useAuthContext).mockReturnValue({});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders message if no shipping address set', () => {
    vi.mocked(getCustomerById).mockResolvedValue(mockAddressesQueryNoAddresses);

    renderWithQueryClient(<Addresses />);

    expect(screen.getByText(/You have not set up a shipping address yet/i)).toBeInTheDocument();
  });

  test('renders message if no billing address set', () => {
    vi.mocked(getCustomerById).mockResolvedValue(mockAddressesQueryNoAddresses);

    renderWithQueryClient(<Addresses />);

    expect(screen.getByText(/You have not set up a billing address yet/i)).toBeInTheDocument();
  });
});
