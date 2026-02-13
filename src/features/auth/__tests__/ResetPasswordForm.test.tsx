import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import ResetPasswordForm from '../ResetPasswordForm';

describe('ResetPasswordForm component', () => {
  test('renders password field and submit button', () => {
    renderWithQueryClient(<ResetPasswordForm />);

    expect(screen.getByRole('form', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save new password/i })).toBeInTheDocument();
  });

  test('renders show password button', () => {
    renderWithQueryClient(<ResetPasswordForm />);

    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  test('reveals password when show password button is clicked', () => {
    renderWithQueryClient(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('shows error message for password less than 8 characters', async () => {
    renderWithQueryClient(<ResetPasswordForm />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save new password/i }));

    await waitFor(() => {
      expect(screen.getByText(/password needs to be longer than 8 characters/i)).toBeInTheDocument();
    });
  });
});
