import SectionHeading from '@components/UI/SectionHeading';

import type { PostComment } from '../../schemas/comment.schema';

import useComments from './hooks/useComments';
import BlogPostCommentsList from './components/list/List';
import BlogPostCommentsForm from './components/Form';

export default function BlogPostComments({ postId, comments }: { postId: string; comments: PostComment[] }) {
  const { commentsList, commentsCount, commentReplyId, setCommentReplyId } = useComments({ comments });

  if (!commentsList || commentsList.length === 0) return null;

  return (
    <section className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      <SectionHeading heading={`Comments (${commentsCount})`} headingLevel="3" />
      <div className="flex flex-col gap-y-10">
        {commentsCount > 0 ? (
          <BlogPostCommentsList
            postId={postId}
            comments={commentsList}
            commentsCount={commentsCount}
            commentReplyId={commentReplyId}
            setCommentReplyId={setCommentReplyId}
          />
        ) : (
          <p className="rounded-sm bg-pampas p-5 text-center">No comments found</p>
        )}
        {commentReplyId === null && <BlogPostCommentsForm postId={postId} commentReplyId={commentReplyId} setCommentReplyId={setCommentReplyId} />}
      </div>
    </section>
  );
}
