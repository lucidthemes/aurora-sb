import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@utils/tests/queryClient';

import NameForm from '../../components/details/NameForm';

describe('NameForm component', () => {
  const handleNameEditShowMock = vi.fn();

  const setNameFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and submit button', () => {
    renderWithQueryClient(<NameForm handleNameEditShow={handleNameEditShowMock} setNameFormNotification={setNameFormNotificationMock} />);

    expect(screen.getByRole('form', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('shows error message for missing first name', async () => {
    renderWithQueryClient(<NameForm handleNameEditShow={handleNameEditShowMock} setNameFormNotification={setNameFormNotificationMock} />);

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a first name/i)).toBeInTheDocument();
    });
  });

  test('shows error message for missing last name', async () => {
    renderWithQueryClient(<NameForm handleNameEditShow={handleNameEditShowMock} setNameFormNotification={setNameFormNotificationMock} />);

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a last name/i)).toBeInTheDocument();
    });
  });
});
