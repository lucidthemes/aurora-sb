import { supabase } from '@lib/supabase/client';
import { RegisterFormReturnSchema } from '@schemas/auth/register.schema';
import type { RegisterForm, RegisterFormReturn } from '@schemas/auth/register.schema';
import { FetchError } from '@services/errors/fetchError';

export async function signUp(formData: RegisterForm): Promise<RegisterFormReturn> {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    throw new FetchError('SIGN_UP_FAILED', error.message);
  }

  if (!data.user) {
    throw new FetchError('SIGN_UP_NO_USER', 'Error creating new user');
  }

  const signUpUser = {
    id: data.user.id,
    email: data.user.email!,
  };

  const parsed = RegisterFormReturnSchema.safeParse(signUpUser);

  if (!parsed.success) {
    throw new FetchError('SIGN_UP_INVALID_DATA', 'Sign up failed schema validation');
  }

  return parsed.data;
}
