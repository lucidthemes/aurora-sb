import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCustomerById } from '@server/shop/getCustomer';
import type { FormNotification } from '@typings/forms/notification';

export default function useName(userId: string) {
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

  const detailsNameQuery = useQuery({
    queryKey: ['detailsName', userId],
    queryFn: () => getCustomerById(userId),
    select: (data) => ({
      firstName: data?.first_name,
      lastName: data?.last_name,
    }),
    enabled: !!userId,
  });

  return {
    nameEditShow,
    handleNameEditShow,
    nameFormNotification,
    setNameFormNotification,
    resetNameFormNotification,
    detailsNameQuery,
  };
}
