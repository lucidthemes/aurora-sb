import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { DetailsPasswordFormSchema } from '@schemas/account/detailsPassword.schema';
import type { DetailsPasswordForm } from '@schemas/account/detailsPassword.schema';
import { updateAccountDetailsPassword } from '@server/account/updatePassword';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

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
    onSuccess: () => {
      setPasswordFormNotification({
        type: 'success',
        message: 'Password successfully updated',
      });
      createLogEvent('info', 'UPDATE_PASSWORD_SUCCESSFUL', 'Password updated', user?.id);
      handlePasswordEditShow();
      reset();
    },
    onError: (error: FetchError) => {
      setPasswordFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message, user?.id);
    },
  });

  const onSubmit = async (data: DetailsPasswordForm) => {
    detailsPasswordFormMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
