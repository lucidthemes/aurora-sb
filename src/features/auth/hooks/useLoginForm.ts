import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuthContext } from '@contexts/AuthContext';
import { LoginFormSchema } from '@schemas/auth/login.schema';
import { getCustomerByEmail } from '@server/shop/getCustomer';

interface LoginFormNotification {
  type: string;
  message: string;
}

export default function useLoginForm() {
  const { handleLogin } = useAuthContext();

  const [loginFormNotification, setLoginFormNotification] = useState<LoginFormNotification>({
    type: '',
    message: '',
  });

  const resetLoginFormNotification = () => {
    setLoginFormNotification({
      type: '',
      message: '',
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    console.log(data); // temp

    try {
      const customer = await getCustomerByEmail('test@example.com');
      if (customer) {
        handleLogin(customer);
        reset();
      } else {
        setLoginFormNotification({
          type: 'error',
          message: 'No account found with those details',
        });
      }
    } catch (error) {
      console.error('Failed to fetch customer.', error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    loginFormNotification,
    resetLoginFormNotification,
  };
}
