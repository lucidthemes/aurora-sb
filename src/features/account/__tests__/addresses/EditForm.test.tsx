import { screen, fireEvent, waitFor } from '@testing-library/react';
import type { User } from '@supabase/supabase-js';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import EditForm from '../../components/addresses/EditForm';

describe('EditForm component', () => {
  const mockLoggedInUser: User = {
    id: '11111111-1111-1111-1111-111111111111',
    aud: 'authenticated',
    email: 'test@example.com',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {
      email: 'example@email.com',
      email_verified: false,
      phone_verified: false,
      sub: '11111111-1111-1111-1111-111111111111',
    },
    created_at: '2026-01-01T00:00:00Z',
  };

  const handleShippingEditShowMock = vi.fn();

  const handleBillingEditShowMock = vi.fn();

  const setShippingFormNotificationMock = vi.fn();

  const setBillingFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders shipping address input fields and submit button', () => {
    renderWithQueryClient(
      <EditForm
        user={mockLoggedInUser}
        section="shipping"
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        setShippingFormNotification={setShippingFormNotificationMock}
        setBillingFormNotification={setBillingFormNotificationMock}
      />
    );

    expect(screen.getByRole('form', { name: /shipping address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 2/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /county/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /postcode/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('renders billing address input fields and submit button', () => {
    renderWithQueryClient(
      <EditForm
        user={mockLoggedInUser}
        section="billing"
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        setShippingFormNotification={setShippingFormNotificationMock}
        setBillingFormNotification={setBillingFormNotificationMock}
      />
    );

    expect(screen.getByRole('form', { name: /billing address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 2/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /county/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /postcode/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('shows error messages for missing shipping address fields', async () => {
    renderWithQueryClient(
      <EditForm
        user={mockLoggedInUser}
        section="shipping"
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        setShippingFormNotification={setShippingFormNotificationMock}
        setBillingFormNotification={setBillingFormNotificationMock}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a first name/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a last name/i)).toBeInTheDocument();
    });
  });

  test('shows error messages for missing billing address fields', async () => {
    renderWithQueryClient(
      <EditForm
        user={mockLoggedInUser}
        section="billing"
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        setShippingFormNotification={setShippingFormNotificationMock}
        setBillingFormNotification={setBillingFormNotificationMock}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a first name/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a last name/i)).toBeInTheDocument();
    });
  });
});
