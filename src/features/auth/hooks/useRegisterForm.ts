import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuthContext } from '@contexts/AuthContext';
import { RegisterFormSchema } from '@schemas/auth/register.schema';
import { getCustomerByEmail } from '@server/shop/getCustomer';

interface RegisterFormNotification {
  type: string;
  message: string;
}

export default function useRegisterForm() {
  const { handleRegister } = useAuthContext();

  const [registerFormNotification, setRegisterFormNotification] = useState<RegisterFormNotification>({
    type: '',
    message: '',
  });

  const resetRegisterFormNotification = () => {
    setRegisterFormNotification({
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
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    console.log(data); // temp

    try {
      const customer = await getCustomerByEmail(data.email);
      if (!customer) {
        const newUser = {
          id: 1,
          email: data.email,
        };

        handleRegister(newUser);
        reset();
      } else {
        setRegisterFormNotification({
          type: 'error',
          message: 'An account with this email address already exists',
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
    registerFormNotification,
    resetRegisterFormNotification,
  };
}
