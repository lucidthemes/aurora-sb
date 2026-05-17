import type { Dispatch, SetStateAction } from 'react';

import type { PostComment } from '../../../../schemas/comment.schema';

import BlogPostCommentsListItem from './Item';

interface BlogPostCommentsListProps {
  postId: string;
  comments: PostComment[];
  commentsCount: number;
  commentReplyId: string | null;
  setCommentReplyId: Dispatch<SetStateAction<string | null>>;
}

export default function BlogPostCommentsList({ postId, comments, commentReplyId, setCommentReplyId }: BlogPostCommentsListProps) {
  return (
    <ul className="flex flex-col gap-y-10" aria-label="Comments">
      {comments.map((comment) => (
        <BlogPostCommentsListItem
          key={comment.id}
          postId={postId}
          comment={comment}
          replies={comment.replies}
          commentReplyId={commentReplyId}
          setCommentReplyId={setCommentReplyId}
        />
      ))}
    </ul>
  );
}
