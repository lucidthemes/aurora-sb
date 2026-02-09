import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import LostPasswordForm from '../LostPasswordForm';

describe('LostPasswordForm component', () => {
  test('renders input fields and submit button', () => {
    render(<LostPasswordForm />);

    expect(screen.getByRole('form', { name: /lost password/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  test('shows error messages for missing fields', async () => {
    render(<LostPasswordForm />);

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows error message for invalid email', async () => {
    render(<LostPasswordForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows success notification for valid form submission', async () => {
    render(<LostPasswordForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/password reset email sent. Please check your inbox./i)).toBeInTheDocument();
    });
  });
});
