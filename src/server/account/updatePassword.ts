import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DetailsPasswordForm } from '@schemas/account/detailsPassword.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

interface UpdateAccountDetailsPasswordParams {
  user: User;
  formData: DetailsPasswordForm;
}

export async function updateAccountDetailsPassword({ user, formData }: UpdateAccountDetailsPasswordParams) {
  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'UPDATE_PASSWORD_FAILED', error.message, user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_PASSWORD_SUCCESSFUL', 'Password updated', user?.id);

  return { success: true };
}
