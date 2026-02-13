import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { LoginFormSchema } from '@schemas/auth/login.schema';
import type { LoginForm } from '@schemas/auth/login.schema';
import { signIn } from '@server/auth/signIn';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';

interface LoginFormNotification {
  type: string;
  message: string;
}

export default function useLoginForm() {
  const [loginFormNotification, setLoginFormNotification] = useState<LoginFormNotification>({
    type: '',
    message: '',
  });

  const resetLoginFormNotification = () => {
    setLoginFormNotification({
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
    resolver: zodResolver(LoginFormSchema),
  });

  const loginFormMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      createLogEvent('info', 'SIGN_IN_SUCCESSFUL', 'User signed in with email: ' + data.email);
      reset();
    },
    onError: (error: FetchError) => {
      setLoginFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message);
    },
  });

  const onSubmit = async (data: LoginForm) => {
    loginFormMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    loginFormNotification,
    resetLoginFormNotification,
  };
}
