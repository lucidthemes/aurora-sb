import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { LostPasswordFormSchema } from '@schemas/auth/lostPassword.schema';
import type { LostPasswordForm } from '@schemas/auth/lostPassword.schema';
import { lostPassword } from '@server/auth/lostPassword';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

export default function useLostPasswordForm() {
  const [lostPasswordFormNotification, setLostPasswordFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const resetLostPasswordFormNotification = () => {
    setLostPasswordFormNotification({
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
    resolver: zodResolver(LostPasswordFormSchema),
  });

  const LostPasswordFormMutation = useMutation({
    mutationFn: lostPassword,
    onSuccess: (data) => {
      setLostPasswordFormNotification({
        type: 'success',
        message: 'Password reset email sent. Please check your inbox.',
      });
      createLogEvent('info', 'LOST_PASSWORD_SUCCESSFUL', 'Lost password submitted for email: ' + data.email);
      reset();
    },
    onError: (error: FetchError) => {
      setLostPasswordFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message);
    },
  });

  const onSubmit = async (data: LostPasswordForm) => {
    LostPasswordFormMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    lostPasswordFormNotification,
    resetLostPasswordFormNotification,
  };
}
