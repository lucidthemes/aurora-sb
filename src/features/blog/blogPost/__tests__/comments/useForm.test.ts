import { act } from '@testing-library/react';

import { renderHookWithQueryClient } from '@utils/tests/queryClient';

import useCommentForm from '../../components/comments/hooks/useForm';

describe('useForm hook', () => {
  const mockPostId = 'c1eea15a-eb0d-4651-a03d-5c5e452a1017';
  const mockCommentReplyId = null;
  const setCommentReplyIdMock = vi.fn();

  test('updates form errors for missing fields', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useCommentForm({ postId: mockPostId, commentReplyId: mockCommentReplyId, setCommentReplyId: setCommentReplyIdMock })
    );

    await act(async () => {
      result.current.setValue('comment', '');
      result.current.setValue('name', '');

      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.comment?.message).toBe('Please enter a comment');
    expect(result.current.errors.name?.message).toBe('Please enter a name');
  });
});
