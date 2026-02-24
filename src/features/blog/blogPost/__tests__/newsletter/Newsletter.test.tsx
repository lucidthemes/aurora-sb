import { screen } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import Newsletter from '../../newsletter';

describe('Newsletter component', () => {
  test('renders heading', () => {
    renderWithQueryClient(<Newsletter />);

    expect(screen.getByRole('heading', { name: /join my newsletter/i })).toBeInTheDocument();
  });

  test('renders subscribe form', () => {
    renderWithQueryClient(<Newsletter />);

    expect(screen.getByRole('form', { name: /newsletter subscribe/i })).toBeInTheDocument();
  });
});
