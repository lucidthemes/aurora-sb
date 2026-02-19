import { supabase } from '@lib/supabase/client';
import { LoginFormReturnSchema } from '@schemas/auth/login.schema';
import type { LoginForm, LoginFormReturn } from '@schemas/auth/login.schema';
import { FetchError } from '@services/errors/fetchError';

export async function signIn(formData: LoginForm): Promise<LoginFormReturn> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    throw new FetchError('SIGN_IN_FAILED', error.message);
  }

  if (!data.user) {
    throw new FetchError('SIGN_IN_NO_USER', 'No user found');
  }

  const parsed = LoginFormReturnSchema.safeParse(data.user.id);

  if (!parsed.success) {
    throw new FetchError('SIGN_IN_INVALID_DATA', 'Sign in failed schema validation');
  }

  return parsed.data;
}
