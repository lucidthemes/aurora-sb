import { z } from 'zod';

export const DetailsPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'Password needs to be longer than 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type DetailsPasswordForm = z.infer<typeof DetailsPasswordFormSchema>;

export const DetailsPasswordFormReturnSchema = z.email();

export type DetailsPasswordFormReturn = z.infer<typeof DetailsPasswordFormReturnSchema>;
