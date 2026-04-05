import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DetailsEmailForm } from '@schemas/account/detailsEmail.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

interface UpdateAccountDetailsEmailParams {
  user: User;
  formData: DetailsEmailForm;
}

export async function updateAccountDetailsEmail({ user, formData }: UpdateAccountDetailsEmailParams) {
  const { error } = await supabase.auth.updateUser({
    email: formData.email,
  });

  if (error) {
    await createLogEvent('error', 'UPDATE_EMAIL_FAILED', error.message, user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_EMAIL_SUCCESSFUL', 'Email updated', user?.id);

  return { success: true };
}
