import type { Dispatch, SetStateAction } from 'react';

import Notification from '@components/Notification';
import Textarea from '@components/Form/Textarea';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

import useCommentForm from '../hooks/useForm';

interface BlogPostCommentsFormProps {
  postId: string;
  commentReplyId: string | null;
  setCommentReplyId: Dispatch<SetStateAction<string | null>>;
}

export default function BlogPostCommentsForm({ postId, commentReplyId, setCommentReplyId }: BlogPostCommentsFormProps) {
  const { register, handleSubmit, onSubmit, errors, isPending, commentFormNotification, resetCommentFormNotification } = useCommentForm({
    postId,
    commentReplyId,
    setCommentReplyId,
  });

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-xwide text-shark uppercase after:mt-2.5 after:block after:h-0.25 after:w-10 after:bg-shark">Leave a comment</h3>
        <button
          className={`${commentReplyId === null ? 'hidden' : 'cursor-pointer'} fill-shark transition-colors duration-300 ease-in-out hover:fill-boulder`}
          onClick={() => setCommentReplyId(null)}
          aria-label="Cancel reply"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-3">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-y-10">
        {commentFormNotification.type !== '' && (
          <Notification
            type={commentFormNotification.type}
            message={commentFormNotification.message}
            duration={5000}
            onClose={() => resetCommentFormNotification()}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Add comment" noValidate>
          <Textarea type="text" {...register('comment')} placeholder="Comment" label="Comment" error={errors.comment?.message} />
          <Input type="text" {...register('name')} placeholder="Name" label="Name" error={errors.name?.message} />
          <Button type="submit" className="max-w-fit" disabled={isPending}>
            Post comment
          </Button>
        </form>
      </div>
    </div>
  );
}
