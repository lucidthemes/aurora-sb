import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { DetailsNameFormSchema } from '@schemas/account/detailsName.schema';
import type { DetailsNameForm } from '@schemas/account/detailsName.schema';
import { updateAccountDetailsName } from '@server/account/updateName';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

export default function useNameForm(user: User | null, handleNameEditShow: () => void, setNameFormNotification: Dispatch<SetStateAction<FormNotification>>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(DetailsNameFormSchema),
  });

  const detailsNameFormMutation = useMutation({
    mutationFn: updateAccountDetailsName,
    onSuccess: (data) => {
      setNameFormNotification({
        type: 'success',
        message: 'Name successfully updated',
      });
      createLogEvent('info', 'UPDATE_NAME_SUCCESSFUL', 'Name updated for user with email: ' + data);
      handleNameEditShow();
      reset();
    },
    onError: (error: FetchError) => {
      setNameFormNotification({
        type: 'error',
        message: error.message,
      });
      createLogEvent('error', error.code, error.message);
    },
  });

  const onSubmit = async (data: DetailsNameForm) => {
    if (!user) return;

    detailsNameFormMutation.mutate({ user, formData: data });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
