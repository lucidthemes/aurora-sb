import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import type { FormNotification } from '@typings/forms/notification';

import { ResetPasswordFormSchema } from '../schemas/resetPassword.schema';
import type { ResetPasswordForm } from '../schemas/resetPassword.schema';
import { resetPassword } from '../server/resetPassword';

export default function useResetPasswordForm() {
  const [resetPasswordFormNotification, setResetPasswordFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const resetResetPasswordFormNotification = () => {
    setResetPasswordFormNotification({
      type: '',
      message: '',
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const resetPasswordFormMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (result) => {
      if (result.success) {
        setResetPasswordFormNotification({
          type: 'success',
          message: 'Password successfully reset',
        });

        reset();
      } else {
        setResetPasswordFormNotification({
          type: 'error',
          message: 'Something went wrong. Please try again',
        });
      }
    },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    resetPasswordFormMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    resetPasswordFormNotification,
    resetResetPasswordFormNotification,
  };
}
