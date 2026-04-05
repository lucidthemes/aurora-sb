import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { AddressForm } from '@schemas/account/address.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

interface updateAccountAddressParams {
  user: User;
  addressColumn: 'shipping_address' | 'billing_address';
  formData: AddressForm;
}

export async function updateAccountAddress({ user, addressColumn, formData }: updateAccountAddressParams) {
  const { error } = await supabase
    .from('customers')
    .update({ [addressColumn]: formData, updated_at: new Date() })
    .eq('id', user.id);

  if (error) {
    if (addressColumn === 'shipping_address') {
      createLogEvent('error', 'UPDATE_SHIPPING_ADDRESS_FAILED', error.message, user?.id);
    } else {
      createLogEvent('error', 'UPDATE_BILLING_ADDRESS_FAILED', error.message, user?.id);
    }

    return { success: false };
  }

  if (addressColumn === 'shipping_address') {
    createLogEvent('info', 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL', 'Shipping address updated', user?.id);
  } else {
    createLogEvent('info', 'UPDATE_BILLING_ADDRESS_SUCCESSFUL', 'Billing address updated', user?.id);
  }

  return { success: true };
}
