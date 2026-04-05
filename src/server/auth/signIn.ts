import { supabase } from '@lib/supabase/client';
import type { LoginForm } from '@schemas/auth/login.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

export async function signIn(formData: LoginForm) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'SIGN_IN_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  if (!data.user) {
    await createLogEvent('error', 'SIGN_IN_NO_USER', 'No user found. Email: ' + formData.email);

    return { success: false };
  }

  await createLogEvent('info', 'SIGN_IN_SUCCESSFUL', 'User signed in', data.user.id);

  return { success: true };
}
