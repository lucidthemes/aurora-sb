import { renderHook, act, waitFor } from '@testing-library/react';

import usePassword from '../../hooks/details/usePassword';

describe('usePassword hook', () => {
  test('changes name edit form to be shown when edit button is clicked', async () => {
    const { result } = renderHook(() => usePassword());

    expect(result.current.passwordEditShow).toEqual(false);

    act(() => {
      result.current.handlePasswordEditShow();
    });

    await waitFor(() => {
      expect(result.current.passwordEditShow).toEqual(true);
    });
  });
});
