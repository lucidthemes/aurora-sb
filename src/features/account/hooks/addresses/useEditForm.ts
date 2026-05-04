import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAccountAddress } from '@server/account/updateAddress';
import type { Address } from '@schemas/shop/address.schema';
import type { FormNotification } from '@typings/forms/notification';

import { AddressFormSchema } from '../../schemas/address.schema';
import type { AddressForm } from '../../schemas/address.schema';

export default function useEditForm(
  user: User | null,
  section: 'shipping' | 'billing',
  firstName?: string | null,
  lastName?: string | null,
  shippingAddress?: Address | null,
  billingAddress?: Address | null,
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
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ['accountAddresses'],
        });

        const successMessage = {
          type: 'success',
          message: `${section} address successfully updated`,
        };

        if (section === 'shipping') {
          if (setShippingFormNotification) setShippingFormNotification(successMessage);

          if (handleShippingEditShow) handleShippingEditShow();
        } else {
          if (setBillingFormNotification) setBillingFormNotification(successMessage);

          if (handleBillingEditShow) handleBillingEditShow();
        }
      } else {
        const errorMessage = {
          type: 'error',
          message: 'Something went wrong. Please try again',
        };

        if (section === 'shipping' && setShippingFormNotification) {
          setShippingFormNotification(errorMessage);
        }

        if (section === 'billing' && setBillingFormNotification) {
          setBillingFormNotification(errorMessage);
        }
      }
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
