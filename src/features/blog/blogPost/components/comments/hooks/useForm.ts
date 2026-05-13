import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import type { FormNotification } from '@typings/forms/notification';

import { CommentFormSchema } from '../schemas/form.schema';
import type { CommentForm } from '../schemas/form.schema';
import createComment from '../server/createComment';

interface UseCommentFormProps {
  postId: string;
  commentReplyId: string | null;
  setCommentReplyId: Dispatch<SetStateAction<string | null>>;
}

export default function useCommentForm({ postId, commentReplyId, setCommentReplyId }: UseCommentFormProps) {
  const [commentFormNotification, setCommentFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const resetCommentFormNotification = () => {
    setCommentFormNotification({
      type: '',
      message: '',
    });

    setCommentReplyId(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(CommentFormSchema),
  });

  const commentFormAddCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (result) => {
      if (result.success) {
        setCommentFormNotification({
          type: 'success',
          message: 'Your comment has successfully been submitted and is awaiting moderation',
        });

        reset();
      } else {
        setCommentFormNotification({
          type: 'error',
          message: 'Error submitting comment',
        });
      }
    },
  });

  const onSubmit = async (data: CommentForm) => {
    commentFormAddCommentMutation.mutate({ postId, formData: data, replyId: commentReplyId });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isPending: commentFormAddCommentMutation.isPending,
    commentFormNotification,
    resetCommentFormNotification,
  };
}
