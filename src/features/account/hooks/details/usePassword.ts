import { useState } from 'react';

import type { FormNotification } from '@typings/forms/notification';

export default function usePassword() {
  const [passwordEditShow, setPasswordEditShow] = useState(false);
  const [passwordFormNotification, setPasswordFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const handlePasswordEditShow = () => {
    setPasswordEditShow((prevState) => !prevState);
  };

  const resetPasswordFormNotification = () => {
    setPasswordFormNotification({
      type: '',
      message: '',
    });
  };

  return { passwordEditShow, handlePasswordEditShow, passwordFormNotification, setPasswordFormNotification, resetPasswordFormNotification };
}
