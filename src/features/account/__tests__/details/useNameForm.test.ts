import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useNameForm from '../../hooks/details/useNameForm';

describe('useNameForm hook', () => {
  const handleNameEditShowMock = vi.fn();

  const setNameFormNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates error for missing first name', async () => {
    const { result } = renderHookWithQueryClient(() => useNameForm(handleNameEditShowMock, setNameFormNotificationMock));

    await act(async () => {
      result.current.setValue('firstName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.firstName?.message).toBe('Please enter a first name');
  });

  test('updates error for missing last name', async () => {
    const { result } = renderHookWithQueryClient(() => useNameForm(handleNameEditShowMock, setNameFormNotificationMock));

    await act(async () => {
      result.current.setValue('lastName', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.lastName?.message).toBe('Please enter a last name');
  });
});
