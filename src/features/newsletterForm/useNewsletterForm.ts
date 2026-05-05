import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { createNewsletterSubscriber } from '@server/newsletter/createNewsletterSubscriber';
import type { FormNotification } from '@typings/forms/notification';

import { NewsletterFormSchema } from './newsletter.schema';
import type { NewsletterForm } from './newsletter.schema';

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

  const newsletterFormMutation = useMutation({
    mutationFn: createNewsletterSubscriber,
    onSuccess: (result) => {
      if (result.success) {
        setNewsletterFormNotification({
          type: 'success',
          message: 'Subscribed',
        });

        reset();
      } else {
        setNewsletterFormNotification({
          type: 'error',
          message: 'Error subscribing',
        });
      }
    },
  });

  const onSubmit = async (data: NewsletterForm) => {
    newsletterFormMutation.mutate(data);
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
