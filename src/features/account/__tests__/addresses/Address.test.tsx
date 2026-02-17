import { render, screen } from '@testing-library/react';

import Address from '../../components/addresses/Address';

describe('Address component', () => {
  test('renders message if no shipping address set', () => {
    render(<Address section="shipping" />);

    expect(screen.getByText(/You have not set up a shipping address yet/i)).toBeInTheDocument();
  });

  test('renders message if no billing address set', () => {
    render(<Address section="billing" />);

    expect(screen.getByText(/You have not set up a billing address yet/i)).toBeInTheDocument();
  });
});
