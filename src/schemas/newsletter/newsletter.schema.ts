import { z } from 'zod';

export const NewsletterFormSchema = z.object({
  email: z.email('Please enter a valid email address').trim().toLowerCase(),
});

export type NewsletterForm = z.infer<typeof NewsletterFormSchema>;
