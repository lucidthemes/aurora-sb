import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewsletterFormSchema } from '@schemas/newsletter/newsletter.schema';
import type { NewsletterForm } from '@schemas/newsletter/newsletter.schema';
import type { FormNotification } from '@typings/forms/notification';

export default function useNewsletterForm() {
  const [newsletterFormNotification, setNewsletterFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const resetNewsletterFormNotification = () => {
    setNewsletterFormNotification({
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
    resolver: zodResolver(NewsletterFormSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    console.log(data); // temp

    setNewsletterFormNotification({
      type: 'success',
      message: 'Subscribed',
    });

    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    newsletterFormNotification,
    resetNewsletterFormNotification,
  };
}
