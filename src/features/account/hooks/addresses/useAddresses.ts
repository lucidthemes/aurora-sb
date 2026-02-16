import { useState } from 'react';

import type { FormNotification } from '@typings/forms/notification';

export default function useAddresses() {
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
  };
}
