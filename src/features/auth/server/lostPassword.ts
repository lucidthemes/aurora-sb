import { supabase } from '@lib/supabase/client';

import { createLogEvent } from '@lib/supabase/logEvent';

import type { LostPasswordForm } from '../schemas/lostPassword.schema';
import { LostPasswordFormSchema } from '../schemas/lostPassword.schema';

export async function lostPassword(formData: LostPasswordForm) {
  const parsed = LostPasswordFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'LOST_PASSWORD_INVALID_DATA', 'Lost password failed schema validation');

    return { success: false };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

  if (error) {
    await createLogEvent('error', 'LOST_PASSWORD_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  await createLogEvent('info', 'LOST_PASSWORD_SUCCESSFUL', 'Lost password. Email: ' + formData.email);

  return { success: true };
}
