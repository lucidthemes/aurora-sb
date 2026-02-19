import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password needs to be longer than 8 characters'),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

export const LoginFormReturnSchema = z.string();

export type LoginFormReturn = z.infer<typeof LoginFormReturnSchema>;
