import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { AddressForm, AddressFormReturn } from '@schemas/account/address.schema';
import { FetchError } from '@services/errors/fetchError';

interface updateAccountAddressParams {
  user: User;
  addressColumn: 'shipping_address' | 'billing_address';
  formData: AddressForm;
}

export async function updateAccountAddress({ user, addressColumn, formData }: updateAccountAddressParams): Promise<AddressFormReturn> {
  const { error } = await supabase
    .from('customers')
    .update({ [addressColumn]: formData, updated_at: new Date() })
    .eq('id', user.id);

  if (error) {
    if (addressColumn === 'shipping_address') {
      throw new FetchError('UPDATE_SHIPPING_ADDRESS_FAILED', error.message);
    } else {
      throw new FetchError('UPDATE_BILLING_ADDRESS_FAILED', error.message);
    }
  }

  return user.email ?? '';
}
