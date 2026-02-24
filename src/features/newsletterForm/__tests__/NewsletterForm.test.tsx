import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import NewsletterForm from '../NewsletterForm';

describe('NewsletterForm component', () => {
  test('renders input and button', () => {
    renderWithQueryClient(<NewsletterForm />);

    expect(screen.getByRole('form', { name: /newsletter subscribe/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  test('shows error message for missing email', async () => {
    renderWithQueryClient(<NewsletterForm />);

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/please enter a valid email address/i);
    });
  });

  test('shows error message for invalid email', async () => {
    renderWithQueryClient(<NewsletterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/please enter a valid email address/i);
    });
  });
});
