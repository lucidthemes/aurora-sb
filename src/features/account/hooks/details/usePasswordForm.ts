import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { updateAccountDetailsPassword } from '@server/account/updatePassword';
import type { FormNotification } from '@typings/forms/notification';

import { DetailsPasswordFormSchema } from '../../schemas/detailsPassword.schema';
import type { DetailsPasswordForm } from '../../schemas/detailsPassword.schema';

export default function usePasswordForm(
  user: User | null,
  handlePasswordEditShow: () => void,
  setPasswordFormNotification: Dispatch<SetStateAction<FormNotification>>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(DetailsPasswordFormSchema),
  });

  const detailsPasswordFormMutation = useMutation({
    mutationFn: updateAccountDetailsPassword,
    onSuccess: (result) => {
      if (result.success) {
        setPasswordFormNotification({
          type: 'success',
          message: 'Password successfully updated',
        });

        handlePasswordEditShow();
        reset();
      } else {
        setPasswordFormNotification({
          type: 'error',
          message: 'Something went wrong. Please try again',
        });
      }
    },
  });

  const onSubmit = async (data: DetailsPasswordForm) => {
    if (!user) return;

    detailsPasswordFormMutation.mutate({ user, formData: data });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
