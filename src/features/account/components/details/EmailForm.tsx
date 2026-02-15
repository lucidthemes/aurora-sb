import type { User } from '@supabase/supabase-js';
import type { Dispatch, SetStateAction } from 'react';

import Input from '@components/Form/Input';
import Button from '@components/UI/Button';
import type { FormNotification } from '@typings/forms/notification';

import useEmailForm from '../../hooks/details/useEmailForm';

interface EmailFormProps {
  user: User | null;
  handleEmailEditShow: () => void;
  setEmailFormNotification: Dispatch<SetStateAction<FormNotification>>;
}

export default function EmailForm({ user, handleEmailEditShow, setEmailFormNotification }: EmailFormProps) {
  const { register, handleSubmit, onSubmit, errors } = useEmailForm(user, handleEmailEditShow, setEmailFormNotification);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Email address" noValidate>
      <Input type="email" {...register('email')} placeholder="Email address" label="Email address" error={errors.email?.message} />
      <Button type="submit" className="max-w-fit">
        Save changes
      </Button>
    </form>
  );
}
