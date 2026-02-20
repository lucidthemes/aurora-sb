import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCustomerById } from '@server/shop/getCustomer';
import type { FormNotification } from '@typings/forms/notification';

export default function useAddresses(userId: string) {
  const [shippingEditShow, setShippingEditShow] = useState(false);
  const [billingEditShow, setBillingEditShow] = useState(false);
  const [shippingFormNotification, setShippingFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });
  const [billingFormNotification, setBillingFormNotification] = useState<FormNotification>({
    type: '',
    message: '',
  });

  const handleShippingEditShow = () => {
    setShippingEditShow((prevState) => !prevState);
  };

  const handleBillingEditShow = () => {
    setBillingEditShow((prevState) => !prevState);
  };

  const resetShippingFormNotification = () => {
    setShippingFormNotification({
      type: '',
      message: '',
    });
  };

  const resetBillingFormNotification = () => {
    setBillingFormNotification({
      type: '',
      message: '',
    });
  };

  const addressesQuery = useQuery({
    queryKey: ['accountAddresses', userId],
    queryFn: () => getCustomerById(userId),
    select: (data) => ({
      firstName: data?.first_name,
      lastName: data?.last_name,
      shippingAddress: data?.shipping_address,
      billingAddress: data?.billing_address,
    }),
    enabled: !!userId,
  });

  return {
    shippingEditShow,
    billingEditShow,
    handleShippingEditShow,
    handleBillingEditShow,
    shippingFormNotification,
    billingFormNotification,
    setShippingFormNotification,
    setBillingFormNotification,
    resetShippingFormNotification,
    resetBillingFormNotification,
    addressesQuery,
  };
}
