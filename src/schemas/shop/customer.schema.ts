import { z } from 'zod';

import { AddressSchema } from './address.schema';

export const CustomerSchema = z.object({
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  shipping_address: AddressSchema.optional().nullable(),
  billing_address: AddressSchema.optional().nullable(),
});

export type Customer = z.infer<typeof CustomerSchema>;
