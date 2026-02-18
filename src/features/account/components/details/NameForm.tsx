import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';

import Input from '@components/Form/Input';
import Button from '@components/UI/Button';
import type { FormNotification } from '@typings/forms/notification';

import useNameForm from '../../hooks/details/useNameForm';

interface NameFormProps {
  user: User | null;
  handleNameEditShow: () => void;
  setNameFormNotification: Dispatch<SetStateAction<FormNotification>>;
}

export default function NameForm({ user, handleNameEditShow, setNameFormNotification }: NameFormProps) {
  const { register, handleSubmit, onSubmit, errors } = useNameForm(user, handleNameEditShow, setNameFormNotification);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Name" noValidate>
      <div className="flex flex-col gap-6 sm:flex-row">
        <Input type="text" {...register('firstName')} placeholder="First name" label="First name" error={errors.firstName?.message} />
        <Input type="text" {...register('lastName')} placeholder="Last name" label="Last name" error={errors.lastName?.message} />
      </div>
      <Button type="submit" className="max-w-fit">
        Save changes
      </Button>
    </form>
  );
}
