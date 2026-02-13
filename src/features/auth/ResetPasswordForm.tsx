import Notification from '@components/Notification';
import Password from '@components/Form/Password';
import Button from '@components/UI/Button';

import useResetPasswordForm from './hooks/useResetPasswordForm';

export default function ResetPasswordForm() {
  const { register, handleSubmit, onSubmit, errors, resetPasswordFormNotification, resetResetPasswordFormNotification } = useResetPasswordForm();

  return (
    <div className="flex flex-col gap-y-5">
      {resetPasswordFormNotification.type !== '' && (
        <Notification
          type={resetPasswordFormNotification.type}
          message={resetPasswordFormNotification.message}
          duration={10000}
          onClose={() => resetResetPasswordFormNotification()}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Reset password" noValidate>
        <Password {...register('password')} placeholder="Password" label="Password" error={errors.password?.message} />
        <Button type="submit" className="max-w-fit">
          Save new password
        </Button>
      </form>
    </div>
  );
}
