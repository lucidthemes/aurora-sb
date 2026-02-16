import type { Dispatch, SetStateAction } from 'react';

import Password from '@components/Form/Password';
import Button from '@components/UI/Button';
import type { FormNotification } from '@typings/forms/notification';

import usePasswordForm from '../../hooks/details/usePasswordForm';

interface PasswordFormProps {
  handlePasswordEditShow: () => void;
  setPasswordFormNotification: Dispatch<SetStateAction<FormNotification>>;
}

export default function PasswordForm({ handlePasswordEditShow, setPasswordFormNotification }: PasswordFormProps) {
  const { register, handleSubmit, onSubmit, errors } = usePasswordForm(handlePasswordEditShow, setPasswordFormNotification);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Password" noValidate>
      <Password {...register('password')} placeholder="New password" label="New password" error={errors.password?.message} />
      <Password {...register('confirmPassword')} placeholder="Confirm password" label="Confirm password" error={errors.confirmPassword?.message} />
      <Button type="submit" className="max-w-fit">
        Save changes
      </Button>
    </form>
  );
}
