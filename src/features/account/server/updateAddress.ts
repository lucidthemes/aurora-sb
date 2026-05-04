import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';

import { createLogEvent } from '@lib/supabase/logEvent';

import type { AddressForm } from '../schemas/address.schema';
import { AddressFormSchema } from '../schemas/address.schema';

interface updateAccountAddressParams {
  user: User;
  addressColumn: 'shipping_address' | 'billing_address';
  formData: AddressForm;
}

export async function updateAccountAddress({ user, addressColumn, formData }: updateAccountAddressParams) {
  const parsed = AddressFormSchema.safeParse(formData);

  if (!parsed.success) {
    if (addressColumn === 'shipping_address') {
      await createLogEvent('error', 'UPDATE_SHIPPING_INVALID_DATA', 'Update shipping address failed schema validation', user?.id);
    } else {
      await createLogEvent('error', 'UPDATE_BILLING_INVALID_DATA', 'Update billing address failed schema validation', user?.id);
    }

    return { success: false };
  }

  const { error } = await supabase
    .from('customers')
    .update({ [addressColumn]: formData, updated_at: new Date() })
    .eq('id', user.id);

  if (error) {
    if (addressColumn === 'shipping_address') {
      await createLogEvent('error', 'UPDATE_SHIPPING_ADDRESS_FAILED', error.message, user?.id);
    } else {
      await createLogEvent('error', 'UPDATE_BILLING_ADDRESS_FAILED', error.message, user?.id);
    }

    return { success: false };
  }

  if (addressColumn === 'shipping_address') {
    await createLogEvent('info', 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL', 'Shipping address updated', user?.id);
  } else {
    await createLogEvent('info', 'UPDATE_BILLING_ADDRESS_SUCCESSFUL', 'Billing address updated', user?.id);
  }

  return { success: true };
}
