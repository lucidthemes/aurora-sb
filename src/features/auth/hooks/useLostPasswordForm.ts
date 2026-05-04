import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import type { FormNotification } from '@typings/forms/notification';

import { LostPasswordFormSchema } from '../schemas/lostPassword.schema';
import type { LostPasswordForm } from '../schemas/lostPassword.schema';
import { lostPassword } from '../server/lostPassword';

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

  const lostPasswordFormMutation = useMutation({
    mutationFn: lostPassword,
    onSuccess: (result) => {
      if (result.success) {
        setLostPasswordFormNotification({
          type: 'success',
          message: 'Password reset email sent',
        });

        reset();
      } else {
        setLostPasswordFormNotification({
          type: 'error',
          message: 'Something went wrong. Please try again',
        });
      }
    },
  });

  const onSubmit = async (data: LostPasswordForm) => {
    lostPasswordFormMutation.mutate(data);
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
