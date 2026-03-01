import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DetailsNameFormSchema } from '@schemas/account/detailsName.schema';
import type { DetailsNameForm } from '@schemas/account/detailsName.schema';
import { updateAccountDetailsName } from '@server/account/updateName';
import type { FormNotification } from '@typings/forms/notification';

export default function useNameForm(
  user: User | null,
  handleNameEditShow: () => void,
  setNameFormNotification: Dispatch<SetStateAction<FormNotification>>,
  firstName?: string | null,
  lastName?: string | null
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
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ['accountDetailsName'],
        });

        setNameFormNotification({
          type: 'success',
          message: 'Name successfully updated',
        });

        handleNameEditShow();
      } else {
        setNameFormNotification({
          type: 'error',
          message: 'Something went wrong. Please try again',
        });
      }
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
