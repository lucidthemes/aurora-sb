import { useState } from 'react';

import type { FormNotification } from '@typings/forms/notification';

export default function useName() {
  const [nameEditShow, setNameEditShow] = useState(false);
  const [nameFormNotification, setNameFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const handleNameEditShow = () => {
    setNameEditShow((prevState) => !prevState);
  };

  const resetNameFormNotification = () => {
    setNameFormNotification({
      type: '',
      message: '',
    });
  };

  return { nameEditShow, handleNameEditShow, nameFormNotification, setNameFormNotification, resetNameFormNotification };
}
