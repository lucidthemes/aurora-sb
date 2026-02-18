import { z } from 'zod';

export const DetailsEmailFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type DetailsEmailForm = z.infer<typeof DetailsEmailFormSchema>;

export const DetailsEmailFormReturnSchema = z.email();

export type DetailsEmailFormReturn = z.infer<typeof DetailsEmailFormReturnSchema>;
