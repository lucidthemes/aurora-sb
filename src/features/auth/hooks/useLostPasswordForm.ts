import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LostPasswordFormSchema } from '@schemas/auth/lostPassword.schema';
import type { LostPasswordForm } from '@schemas/auth/lostPassword.schema';

interface LostPasswordFormNotification {
  type: string;
  message: string;
}

export default function useLostPasswordForm() {
  const [lostPasswordFormNotification, setLostPasswordFormNotification] = useState<LostPasswordFormNotification>({
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

  const onSubmit = async (data: LostPasswordForm) => {
    console.log(data); // temp

    setLostPasswordFormNotification({
      type: 'success',
      message: 'Password reset email sent. Please check your inbox.',
    });

    reset();
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
