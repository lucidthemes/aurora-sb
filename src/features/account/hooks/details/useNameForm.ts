import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';

import { DetailsNameFormSchema } from '@schemas/account/detailsName.schema';
import type { DetailsNameForm } from '@schemas/account/detailsName.schema';
import type { FormNotification } from '@typings/forms/notification';

export default function useNameForm(handleNameEditShow: () => void, setNameFormNotification: Dispatch<SetStateAction<FormNotification>>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(DetailsNameFormSchema),
  });

  const onSubmit = async (data: DetailsNameForm) => {
    console.log(data); // temp

    setNameFormNotification({
      type: 'success',
      message: 'Name successfully updated',
    });
    handleNameEditShow();
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
