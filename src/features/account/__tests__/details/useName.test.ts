import { renderHook, act, waitFor } from '@testing-library/react';

import useName from '../../hooks/details/useName';

describe('useName hook', () => {
  test('changes name edit form to be shown when edit button is clicked', async () => {
    const { result } = renderHook(() => useName());

    expect(result.current.nameEditShow).toEqual(false);

    act(() => {
      result.current.handleNameEditShow();
    });

    await waitFor(() => {
      expect(result.current.nameEditShow).toEqual(true);
    });
  });
});
