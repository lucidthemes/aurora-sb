import { z } from 'zod';

import { AddressSchema } from './address.schema';

export const CustomerSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  shipping_address: AddressSchema.optional(),
  billing_address: AddressSchema.optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;
