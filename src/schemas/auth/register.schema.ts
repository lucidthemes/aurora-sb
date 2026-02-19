import { z } from 'zod';

export const RegisterFormSchema = z
  .object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password needs to be longer than 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterForm = z.infer<typeof RegisterFormSchema>;

export const RegisterFormReturnSchema = z.string();

export type RegisterFormReturn = z.infer<typeof RegisterFormReturnSchema>;
