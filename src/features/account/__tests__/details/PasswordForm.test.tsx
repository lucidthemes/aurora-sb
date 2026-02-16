import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import PasswordForm from '../../components/details/PasswordForm';

describe('PasswordForm component', () => {
  const handlePasswordEditShowMock = vi.fn();

  const setPasswordFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and submit button', () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    expect(screen.getByRole('form', { name: /password/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('renders show password button for password field', () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    expect(screen.getByRole('button', { name: /show new password/i })).toBeInTheDocument();
  });

  test('renders show password button for confirm password field', () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    expect(screen.getByRole('button', { name: /show confirm password/i })).toBeInTheDocument();
  });

  test('reveals password when show password button is clicked', () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    const passwordInput = screen.getByLabelText('New password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show new password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('reveals confirm password when show password button is clicked', () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show confirm password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('shows error message for password less than 8 characters', async () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    fireEvent.change(screen.getByLabelText('New password'), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/password needs to be longer than 8 characters/i)).toBeInTheDocument();
    });
  });

  test('shows error message for passwords that do not match', async () => {
    renderWithQueryClient(<PasswordForm handlePasswordEditShow={handlePasswordEditShowMock} setPasswordFormNotification={setPasswordFormNotificationMock} />);

    fireEvent.change(screen.getByLabelText('New password'), {
      target: { value: 'password1' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password2' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
});
