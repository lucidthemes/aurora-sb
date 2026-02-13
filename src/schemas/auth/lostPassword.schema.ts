import { z } from 'zod';

export const LostPasswordFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type LostPasswordForm = z.infer<typeof LostPasswordFormSchema>;

export const LostPasswordFormReturnSchema = z.object({
  email: z.email(),
});

export type LostPasswordFormReturn = z.infer<typeof LostPasswordFormReturnSchema>;
