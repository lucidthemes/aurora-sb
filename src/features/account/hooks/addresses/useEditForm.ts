import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { AddressFormSchema } from '@schemas/account/address.schema';
import type { AddressForm } from '@schemas/account/address.schema';
import { updateAccountAddress } from '@server/account/updateAddress';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { FormNotification } from '@typings/forms/notification';

export default function useEditForm(
  user: User | null,
  section: 'shipping' | 'billing',
  handleShippingEditShow?: () => void,
  handleBillingEditShow?: () => void,
  setShippingFormNotification?: Dispatch<SetStateAction<FormNotification>>,
  setBillingFormNotification?: Dispatch<SetStateAction<FormNotification>>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(AddressFormSchema),
  });

  const addressFormMutation = useMutation({
    mutationFn: updateAccountAddress,
    onSuccess: () => {
      if (section === 'shipping') {
        if (setShippingFormNotification) {
          setShippingFormNotification({
            type: 'success',
            message: 'Shipping address successfully updated',
          });
        }

        createLogEvent('info', 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL', 'Shipping address updated', user?.id);

        if (handleShippingEditShow) handleShippingEditShow();
      } else {
        if (setBillingFormNotification) {
          setBillingFormNotification({
            type: 'success',
            message: 'Billing address successfully updated',
          });
        }

        createLogEvent('info', 'UPDATE_BILLING_ADDRESS_SUCCESSFUL', 'Billing address updated', user?.id);

        if (handleBillingEditShow) handleBillingEditShow();
      }

      reset();
    },
    onError: (error: FetchError) => {
      if (section === 'shipping' && setShippingFormNotification) {
        setShippingFormNotification({
          type: 'error',
          message: error.message,
        });
      }

      if (section === 'billing' && setBillingFormNotification) {
        setBillingFormNotification({
          type: 'error',
          message: error.message,
        });
      }

      createLogEvent('error', error.code, error.message, user?.id);
    },
  });

  const onSubmit = async (data: AddressForm) => {
    if (!user) return;

    if (section === 'shipping') {
      addressFormMutation.mutate({ user, addressColumn: 'shipping_address', formData: data });
    } else {
      addressFormMutation.mutate({ user, addressColumn: 'billing_address', formData: data });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
}
