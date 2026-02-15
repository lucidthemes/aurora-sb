import { useState } from 'react';

import type { FormNotification } from '@typings/forms/notification';

export default function useEmail() {
  const [emailEditShow, setEmailEditShow] = useState(false);
  const [emailFormNotification, setEmailFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const handleEmailEditShow = () => {
    setEmailEditShow((prevState) => !prevState);
  };

  const resetEmailFormNotification = () => {
    setEmailFormNotification({
      type: '',
      message: '',
    });
  };

  return { emailEditShow, handleEmailEditShow, emailFormNotification, setEmailFormNotification, resetEmailFormNotification };
}
