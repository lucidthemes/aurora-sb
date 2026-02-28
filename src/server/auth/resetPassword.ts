import { supabase } from '@lib/supabase/client';
import type { ResetPasswordForm } from '@schemas/auth/resetPassword.schema';
import { createLogEvent } from '@services/logs/createLogEvent';

export async function resetPassword(formData: ResetPasswordForm) {
  const { data, error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    createLogEvent('error', 'RESET_PASSWORD_FAILED', error.message);

    return { success: false };
  }

  if (!data.user) {
    createLogEvent('error', 'RESET_PASSWORD_NO_USER', 'No user found');

    return { success: false };
  }

  createLogEvent('info', 'RESET_PASSWORD_SUCCESSFUL', 'Password reset', data.user.id);

  return { success: true };
}
