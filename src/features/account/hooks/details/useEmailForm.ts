import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@supabase/supabase-js';
import type { Dispatch, SetStateAction } from 'react';

import { DetailsEmailFormSchema } from '@schemas/account/detailsEmail.schema';
import type { DetailsEmailForm } from '@schemas/account/detailsEmail.schema';
import type { FormNotification } from '@typings/forms/notification';

export default function useEmailForm(user: User | null, handleEmailEditShow: () => void, setEmailFormNotification: Dispatch<SetStateAction<FormNotification>>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      email: user?.email ?? '',
    },
    resolver: zodResolver(DetailsEmailFormSchema),
  });

  const onSubmit = async (data: DetailsEmailForm) => {
    if (user?.email !== data.email) {
      console.log(data); // temp

      setEmailFormNotification({
        type: 'success',
        message: 'Email address successfully updated',
      });
      handleEmailEditShow();
      reset();
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
