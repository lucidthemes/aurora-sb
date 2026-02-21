import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DetailsNameFormSchema } from '@schemas/account/detailsName.schema';
import type { DetailsNameForm } from '@schemas/account/detailsName.schema';
import { updateAccountDetailsName } from '@server/account/updateName';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

export default function useNameForm(
  user: User | null,
  handleNameEditShow: () => void,
  setNameFormNotification: Dispatch<SetStateAction<FormNotification>>,
  firstName?: string,
  lastName?: string
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
    },
    resolver: zodResolver(DetailsNameFormSchema),
  });

  const queryClient = useQueryClient();

  const detailsNameFormMutation = useMutation({
    mutationFn: updateAccountDetailsName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accountDetailsName'],
      });

      setNameFormNotification({
        type: 'success',
        message: 'Name successfully updated',
      });

      createLogEvent('info', 'UPDATE_NAME_SUCCESSFUL', 'Name updated', user?.id);

      handleNameEditShow();
    },
    onError: (error: FetchError) => {
      setNameFormNotification({
        type: 'error',
        message: error.message,
      });

      createLogEvent('error', error.code, error.message, user?.id);
    },
  });

  const onSubmit = async (data: DetailsNameForm) => {
    if (!user) return;

    if (firstName && firstName === data.firstName && lastName && lastName === data.lastName) return;

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
