import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

import useLostPasswordForm from './hooks/useLostPasswordForm';

export default function LostPasswordForm() {
  const { register, handleSubmit, onSubmit, errors, lostPasswordFormNotification, resetLostPasswordFormNotification } = useLostPasswordForm();

  return (
    <div className="flex flex-col gap-y-5">
      {lostPasswordFormNotification.type !== '' && (
        <Notification
          type={lostPasswordFormNotification.type}
          message={lostPasswordFormNotification.message}
          duration={10000}
          onClose={() => resetLostPasswordFormNotification()}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Lost password" noValidate>
        <Input type="email" {...register('email')} placeholder="Email address" label="Email address" error={errors.email?.message} />
        <Button type="submit" className="max-w-fit">
          Reset password
        </Button>
      </form>
    </div>
  );
}
