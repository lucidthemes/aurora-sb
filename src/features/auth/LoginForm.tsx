import { Link } from 'react-router-dom';

import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Password from '@components/Form/Password';
import Button from '@components/UI/Button';

import useLoginForm from './hooks/useLoginForm';

export default function LoginForm() {
  const { register, handleSubmit, onSubmit, errors, loginFormNotification, resetLoginFormNotification } = useLoginForm();

  return (
    <div className="flex flex-col gap-y-5">
      {loginFormNotification.type !== '' && (
        <Notification type={loginFormNotification.type} message={loginFormNotification.message} duration={10000} onClose={() => resetLoginFormNotification()} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Login" noValidate>
        <Input type="email" {...register('email')} placeholder="Email address" label="Email address" error={errors.email?.message} />
        <Password {...register('password')} placeholder="Password" label="Password" error={errors.password?.message} />
        <Button type="submit" className="max-w-fit">
          Login
        </Button>
      </form>
      <Link to="/lost-password" className="max-w-fit text-boulder underline transition-colors duration-300 ease-in-out hover:text-shark">
        Lost your password?
      </Link>
    </div>
  );
}
