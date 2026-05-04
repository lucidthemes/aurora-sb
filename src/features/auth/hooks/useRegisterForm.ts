import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import type { FormNotification } from '@typings/forms/notification';

import { RegisterFormSchema } from '../schemas/register.schema';
import type { RegisterForm } from '../schemas/register.schema';
import { signUp } from '../server/signUp';

export default function useRegisterForm() {
  const [registerFormNotification, setRegisterFormNotification] = useState<FormNotification>({
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
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  const registerFormMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (result) => {
      if (!result.success) {
        setRegisterFormNotification({
          type: 'error',
          message: 'Something went wrong. Please try again',
        });
      }
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    registerFormMutation.mutate(data);
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
