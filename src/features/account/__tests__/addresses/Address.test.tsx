import { render, screen } from '@testing-library/react';

import type { Address as AddressType } from '@schemas/shop/address.schema';

import Address from '../../components/addresses/Address';

describe('Address component', () => {
  const mockAddress: AddressType = {
    firstName: 'Matthew',
    lastName: 'James',
    country: 'GB',
    addressLine1: '68 Rose Place',
    addressLine2: '',
    city: 'East Marybury',
    county: 'Highland',
    postcode: 'IV2 7EG',
    phone: '01234567890',
  };

  test('renders address', () => {
    render(<Address address={mockAddress} />);

    expect(screen.getByText(/Matthew/i)).toBeInTheDocument();
    expect(screen.getByText(/James/i)).toBeInTheDocument();
    expect(screen.getByText(/68 Rose Place/i)).toBeInTheDocument();
    expect(screen.getByText(/East Marybury/i)).toBeInTheDocument();
    expect(screen.getByText(/Highland/i)).toBeInTheDocument();
    expect(screen.getByText(/IV2 7EG/i)).toBeInTheDocument();
    expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument();
    expect(screen.getByText(/01234567890/i)).toBeInTheDocument();
  });
});
