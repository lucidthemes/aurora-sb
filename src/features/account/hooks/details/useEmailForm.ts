import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@supabase/supabase-js';
import type { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';

import { DetailsEmailFormSchema } from '@schemas/account/detailsEmail.schema';
import type { DetailsEmailForm } from '@schemas/account/detailsEmail.schema';
import { updateAccountDetailsEmail } from '@server/account/updateEmail';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

export default function useEmailForm(user: User | null, handleEmailEditShow: () => void, setEmailFormNotification: Dispatch<SetStateAction<FormNotification>>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: user?.email ?? '',
    },
    resolver: zodResolver(DetailsEmailFormSchema),
  });

  const detailsEmailFormMutation = useMutation({
    mutationFn: updateAccountDetailsEmail,
    onSuccess: () => {
      setEmailFormNotification({
        type: 'success',
        message: 'Email address update submitted. Please check your email to confirm',
      });
      createLogEvent('info', 'UPDATE_EMAIL_SUCCESSFUL', 'Email updated', user?.id);
      handleEmailEditShow();
    },
    onError: (error: FetchError, variables) => {
      setEmailFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message + '. Email: ' + variables.email, user?.id);
    },
  });

  const onSubmit = async (data: DetailsEmailForm) => {
    if (user?.email !== data.email) {
      detailsEmailFormMutation.mutate(data);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
