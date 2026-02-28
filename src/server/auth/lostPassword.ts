import { supabase } from '@lib/supabase/client';
import type { LostPasswordForm } from '@schemas/auth/lostPassword.schema';
import { createLogEvent } from '@services/logs/createLogEvent';

export async function lostPassword(formData: LostPasswordForm) {
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

  if (error) {
    createLogEvent('error', 'LOST_PASSWORD_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  createLogEvent('info', 'LOST_PASSWORD_SUCCESSFUL', 'Lost password. Email: ' + formData.email);

  return { success: true };
}
