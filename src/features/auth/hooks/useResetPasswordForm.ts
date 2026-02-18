import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { ResetPasswordFormSchema } from '@schemas/auth/resetPassword.schema';
import type { ResetPasswordForm } from '@schemas/auth/resetPassword.schema';
import { resetPassword } from '@server/auth/resetPassword';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

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

  const ResetPasswordFormMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      setResetPasswordFormNotification({
        type: 'success',
        message: 'Password successfully reset. You can now log in.',
      });
      createLogEvent('info', 'RESET_PASSWORD_SUCCESSFUL', 'Password reset for email: ' + data);
      reset();
    },
    onError: (error: FetchError) => {
      setResetPasswordFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message);
    },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    ResetPasswordFormMutation.mutate(data);
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
