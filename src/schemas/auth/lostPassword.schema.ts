import { z } from 'zod';

export const LostPasswordFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type LostPasswordForm = z.infer<typeof LostPasswordFormSchema>;
