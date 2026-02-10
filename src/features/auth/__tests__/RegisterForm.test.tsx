import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import RegisterForm from '../RegisterForm';

describe('RegisterForm component', () => {
  test('renders input fields and submit button', () => {
    renderWithQueryClient(<RegisterForm />);

    expect(screen.getByRole('form', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('renders show password button for password field', () => {
    renderWithQueryClient(<RegisterForm />);

    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  test('renders show password button for confirm password field', () => {
    renderWithQueryClient(<RegisterForm />);

    expect(screen.getByRole('button', { name: /show confirm password/i })).toBeInTheDocument();
  });

  test('reveals password when show password button is clicked', () => {
    renderWithQueryClient(<RegisterForm />);

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('reveals confirm password when show password button is clicked', () => {
    renderWithQueryClient(<RegisterForm />);

    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show confirm password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('shows error messages for missing fields', async () => {
    renderWithQueryClient(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password needs to be longer than 8 characters/i)).toBeInTheDocument();
    });
  });

  test('shows error message for invalid email', async () => {
    renderWithQueryClient(<RegisterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows error message for password less than 8 characters', async () => {
    renderWithQueryClient(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/password needs to be longer than 8 characters/i)).toBeInTheDocument();
    });
  });

  test('shows error message for passwords that do not match', async () => {
    renderWithQueryClient(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password1' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password2' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
});
