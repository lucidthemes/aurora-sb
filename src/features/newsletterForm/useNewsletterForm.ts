import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { NewsletterFormSchema } from '@schemas/newsletter/newsletter.schema';
import type { NewsletterForm } from '@schemas/newsletter/newsletter.schema';
import { createNewsletterSubscriber } from '@server/newsletter/createNewsletterSubscriber';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
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

  const newsletterFormMutation = useMutation({
    mutationFn: createNewsletterSubscriber,
    onSuccess: (_, variables) => {
      setNewsletterFormNotification({
        type: 'success',
        message: 'Subscribed',
      });

      createLogEvent('info', 'CREATE_NEWSLETTER_SUBSCRIBER_SUCCESSFUL', 'Newsletter subscriber: ' + variables.email);

      reset();
    },
    onError: (error: FetchError, variables) => {
      if (error.message.includes('duplicate')) error.message = 'Email already subscribed';

      setNewsletterFormNotification({
        type: 'error',
        message: error.message,
      });

      createLogEvent('error', error.code, error.message + '. Email: ' + variables.email);
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
