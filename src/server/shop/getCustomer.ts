import { supabase } from '@lib/supabase/client';

import { CustomerSchema } from '@schemas/shop/customer.schema';
import type { Customer } from '@schemas/shop/customer.schema';
import { FetchError } from '@services/errors/fetchError';

export async function getCustomer(id: string): Promise<Customer | undefined> {
  const { data, error } = await supabase.from('customers').select('first_name, last_name, shipping_address, billing_address').eq('id', id).maybeSingle();

  if (error) {
    throw new FetchError('FETCH_CUSTOMER_FAILED', error.message);
  }

  if (!data) {
    throw new FetchError('FETCH_CUSTOMER_NO_USER', 'No user found');
  }

  const parsed = CustomerSchema.safeParse(data);

  if (!parsed.success) {
    throw new FetchError('FETCH_CUSTOMER_INVALID_DATA', 'Get customer failed schema validation');
  }

  return parsed.data;
}

export function getCustomerById(id: string) {
  return getCustomer(id);
}
