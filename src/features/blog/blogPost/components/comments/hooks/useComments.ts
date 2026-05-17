import { useState } from 'react';

import type { PostComment } from '../../../schemas/comment.schema';

export default function useComments({ comments }: { comments: PostComment[] }) {
  const [commentReplyId, setCommentReplyId] = useState<string | null>(null);

  const commentReplies = (parentId: string): PostComment[] => {
    return comments
      .filter((comment) => comment.reply_to === parentId)
      .map((comment) => ({
        ...comment,
        replies: commentReplies(comment.id),
      }));
  };

  const commentsList = comments
    .filter((comment) => comment.reply_to === null)
    .map((comment) => ({
      ...comment,
      replies: commentReplies(comment.id),
    }));

  const commentsCount = comments.length;

  return { commentsList, commentsCount, commentReplyId, setCommentReplyId };
}
