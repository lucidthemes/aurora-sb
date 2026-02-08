import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Password from '@components/Form/Password';
import Button from '@components/UI/Button';

import useRegisterForm from './hooks/useRegisterForm';

export default function RegisterForm() {
  const { register, handleSubmit, onSubmit, errors, registerFormNotification, resetRegisterFormNotification } = useRegisterForm();

  return (
    <div className="flex flex-col gap-y-5">
      {registerFormNotification.type !== '' && (
        <Notification
          type={registerFormNotification.type}
          message={registerFormNotification.message}
          duration={10000}
          onClose={() => resetRegisterFormNotification()}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Register" noValidate>
        <Input type="email" {...register('email')} placeholder="Email address" label="Email address" error={errors.email?.message} />
        <Password {...register('password')} placeholder="Password" label="Password" error={errors.password?.message} />
        <Password {...register('confirmPassword')} placeholder="Confirm password" label="Confirm password" error={errors.confirmPassword?.message} />
        <Button type="submit" className="max-w-fit">
          Register
        </Button>
      </form>
    </div>
  );
}
