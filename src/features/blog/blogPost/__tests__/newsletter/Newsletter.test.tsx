import { screen } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import BlogPostNewsletter from '../../components/newsletter';

describe('BlogPostNewsletter component', () => {
  test('renders heading', () => {
    renderWithQueryClient(<BlogPostNewsletter />);

    expect(screen.getByRole('heading', { name: /join my newsletter/i })).toBeInTheDocument();
  });

  test('renders subscribe form', () => {
    renderWithQueryClient(<BlogPostNewsletter />);

    expect(screen.getByRole('form', { name: /newsletter subscribe/i })).toBeInTheDocument();
  });
});
