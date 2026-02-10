import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

import { RegisterFormSchema } from '@schemas/auth/register.schema';
import { signUp } from '@server/auth/signUp';
import type { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';

interface RegisterFormNotification {
  type: string;
  message: string;
}

export default function useRegisterForm() {
  const [registerFormNotification, setRegisterFormNotification] = useState<RegisterFormNotification>({
    type: '',
    message: '',
  });

  const resetRegisterFormNotification = () => {
    setRegisterFormNotification({
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
    resolver: zodResolver(RegisterFormSchema),
  });

  const signUpUserMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setRegisterFormNotification({
        type: 'success',
        message: 'User successfully created. You can now log in.',
      });
      createLogEvent('info', 'SIGN_UP_SUCCESSFUL', 'User signed up with email: ' + data.email);
      reset();
    },
    onError: (error: FetchError) => {
      setRegisterFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    signUpUserMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    registerFormNotification,
    resetRegisterFormNotification,
  };
}
