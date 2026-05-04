import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { FormNotification } from '@typings/forms/notification';

import { ContactFormSchema } from './contact.schema';
import type { ContactForm } from './contact.schema';

export default function useContactForm() {
  const [contactFormNotification, setContactFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const resetContactFormNotification = () => {
    setContactFormNotification({
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
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log(data); // temp

    setContactFormNotification({
      type: 'success',
      message: 'Your message has successfully been sent',
    });

    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    contactFormNotification,
    resetContactFormNotification,
  };
}
