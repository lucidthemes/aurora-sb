import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddressFormSchema } from '@schemas/account/address.schema';
import type { AddressForm } from '@schemas/account/address.schema';
import { updateAccountAddress } from '@server/account/updateAddress';
import { FetchError } from '@services/errors/fetchError';
import { createLogEvent } from '@services/logs/createLogEvent';
import type { Address } from '@schemas/shop/address.schema';
import type { FormNotification } from '@typings/forms/notification';

export default function useEditForm(
  user: User | null,
  section: 'shipping' | 'billing',
  firstName?: string,
  lastName?: string,
  shippingAddress?: Address,
  billingAddress?: Address,
  handleShippingEditShow?: () => void,
  handleBillingEditShow?: () => void,
  setShippingFormNotification?: Dispatch<SetStateAction<FormNotification>>,
  setBillingFormNotification?: Dispatch<SetStateAction<FormNotification>>
) {
  const formDefaultValues =
    section === 'shipping'
      ? {
          firstName: shippingAddress?.firstName ?? firstName ?? '',
          lastName: shippingAddress?.lastName ?? lastName ?? '',
          addressLine1: shippingAddress?.addressLine1 ?? '',
          addressLine2: shippingAddress?.addressLine2 ?? '',
          city: shippingAddress?.city ?? '',
          county: shippingAddress?.county ?? '',
          postcode: shippingAddress?.postcode ?? '',
          country: shippingAddress?.country ?? '',
          phone: shippingAddress?.phone ?? '',
        }
      : {
          firstName: billingAddress?.firstName ?? firstName ?? '',
          lastName: billingAddress?.lastName ?? lastName ?? '',
          addressLine1: billingAddress?.addressLine1 ?? '',
          addressLine2: billingAddress?.addressLine2 ?? '',
          city: billingAddress?.city ?? '',
          county: billingAddress?.county ?? '',
          postcode: billingAddress?.postcode ?? '',
          country: billingAddress?.country ?? '',
          phone: billingAddress?.phone ?? '',
        };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: formDefaultValues,
    resolver: zodResolver(AddressFormSchema),
  });

  const queryClient = useQueryClient();

  const addressFormMutation = useMutation({
    mutationFn: updateAccountAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accountAddresses'],
      });

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
