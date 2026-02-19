import { z } from 'zod';

export const DetailsNameFormSchema = z.object({
  firstName: z.string().min(1, 'Please enter a first name'),
  lastName: z.string().min(1, 'Please enter a last name'),
});

export type DetailsNameForm = z.infer<typeof DetailsNameFormSchema>;
