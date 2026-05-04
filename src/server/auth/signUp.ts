import { supabase } from '@lib/supabase/client';

import type { RegisterForm } from '@features/auth/schemas/register.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

export async function signUp(formData: RegisterForm) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'SIGN_UP_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  if (!data.user) {
    await createLogEvent('error', 'SIGN_UP_NO_USER', 'Error creating new user. Email: ' + formData.email);

    return { success: false };
  }

  await createLogEvent('info', 'SIGN_UP_SUCCESSFUL', 'User signed up', data.user.id);

  return { success: true };
}
