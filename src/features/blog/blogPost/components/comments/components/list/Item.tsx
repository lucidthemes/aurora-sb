import type { Dispatch, SetStateAction } from 'react';

import type { PostComment } from '../../../../schemas/comment.schema';

import BlogPostCommentsListComment from './Comment';
import BlogPostCommentsForm from '../Form';

interface BlogPostCommentsListItemProps {
  postId: string;
  comment: PostComment;
  replies?: PostComment[];
  commentReplyId: string | null;
  setCommentReplyId: Dispatch<SetStateAction<string | null>>;
}

export default function BlogPostCommentsListItem({ postId, comment, replies = [], commentReplyId, setCommentReplyId }: BlogPostCommentsListItemProps) {
  return (
    <li className="flex flex-col gap-y-10">
      <BlogPostCommentsListComment comment={comment} setCommentReplyId={setCommentReplyId} />

      {commentReplyId === comment.id && <BlogPostCommentsForm postId={postId} commentReplyId={commentReplyId} setCommentReplyId={setCommentReplyId} />}

      {replies.length > 0 && (
        <ul className="flex flex-col gap-y-10 pl-10">
          {replies.map((reply) => (
            <BlogPostCommentsListItem
              key={reply.id}
              postId={postId}
              comment={reply}
              replies={reply.replies}
              commentReplyId={commentReplyId}
              setCommentReplyId={setCommentReplyId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
