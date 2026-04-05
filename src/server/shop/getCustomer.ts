import { supabase } from '@lib/supabase/client';

import { CustomerSchema } from '@schemas/shop/customer.schema';
import type { Customer } from '@schemas/shop/customer.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

export async function getCustomer(id: string): Promise<Customer | null> {
  const { data, error } = await supabase.from('customers').select('first_name, last_name, shipping_address, billing_address').eq('id', id).maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_CUSTOMER_FAILED', error.message);

    return null;
  }

  if (!data) {
    await createLogEvent('error', 'FETCH_CUSTOMER_NO_USER', 'No user found');

    return null;
  }

  const parsed = CustomerSchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_CUSTOMER_INVALID_DATA', 'Get customer failed schema validation');

    return null;
  }

  return parsed.data;
}

export function getCustomerById(id: string) {
  return getCustomer(id);
}
