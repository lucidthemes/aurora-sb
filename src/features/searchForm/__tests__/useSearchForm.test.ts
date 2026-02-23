import { renderHook, act, waitFor } from '@testing-library/react';

import useSearchForm from '../useSearchForm';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('useSearchForm hook', () => {
  test('updates error for missing search term', async () => {
    const { result } = renderHook(() => useSearchForm('page'));

    await act(async () => {
      result.current.setValue('term', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.term?.message).toBe('Please enter a search term');
  });

  test('navigates to search page for valid form submission', async () => {
    const { result } = renderHook(() => useSearchForm('page'));

    await act(async () => {
      result.current.setValue('term', 'test');

      await result.current.handleSubmit(result.current.onSubmit)();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/search/test');
    });
  });
});
