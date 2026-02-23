import { z } from 'zod';

export const NewsletterFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type NewsletterForm = z.infer<typeof NewsletterFormSchema>;
