import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';

import { DetailsPasswordFormSchema } from '@schemas/account/detailsPassword.schema';
import type { DetailsPasswordForm } from '@schemas/account/detailsPassword.schema';
import type { FormNotification } from '@typings/forms/notification';

export default function usePasswordForm(handlePasswordEditShow: () => void, setPasswordFormNotification: Dispatch<SetStateAction<FormNotification>>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(DetailsPasswordFormSchema),
  });

  const onSubmit = async (data: DetailsPasswordForm) => {
    console.log(data); // temp

    setPasswordFormNotification({
      type: 'success',
      message: 'Password successfully updated',
    });
    handlePasswordEditShow();
    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
