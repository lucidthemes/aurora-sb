import { z } from 'zod';

export const AddressFormSchema = z.object({
  firstName: z.string().min(1, 'Please enter a first name'),
  lastName: z.string().min(1, 'Please enter a last name'),
  country: z.string().min(1, 'Please select a country'),
  addressLine1: z.string().min(1, 'Please enter an address'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'Please enter a city'),
  county: z.string().optional(),
  postcode: z.string().min(1, 'Please enter a postcode'),
  phone: z.string().optional(),
});

export type AddressForm = z.infer<typeof AddressFormSchema>;

export const AddressFormReturnSchema = z.email();

export type AddressFormReturn = z.infer<typeof AddressFormReturnSchema>;
