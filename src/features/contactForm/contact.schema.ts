import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Please enter a name'),
  email: z.email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z.string().min(1, 'Please enter a message'),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;
