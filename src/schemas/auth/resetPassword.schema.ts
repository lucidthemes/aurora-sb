import { z } from 'zod';

export const ResetPasswordFormSchema = z.object({
  password: z.string().min(8, 'Password needs to be longer than 8 characters'),
});

export type ResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>;

export const ResetPasswordFormReturnSchema = z.object({
  email: z.email(),
});

export type ResetPasswordFormReturn = z.infer<typeof ResetPasswordFormReturnSchema>;
