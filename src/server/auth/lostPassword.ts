import { supabase } from '@lib/supabase/client';
import type { LostPasswordForm } from '@schemas/auth/lostPassword.schema';
import { FetchError } from '@services/errors/fetchError';

export async function lostPassword(formData: LostPasswordForm) {
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new FetchError('LOST_PASSWORD_FAILED', error.message);
  }
}
