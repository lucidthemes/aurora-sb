import { supabase } from '@lib/supabase/client';
import type { LostPasswordForm, LostPasswordFormReturn } from '@schemas/auth/lostPassword.schema';
import { FetchError } from '@services/errors/fetchError';

export async function lostPassword(formData: LostPasswordForm): Promise<LostPasswordFormReturn> {
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new FetchError('LOST_PASSWORD_FAILED', error.message);
  }

  return { email: formData.email };
}
