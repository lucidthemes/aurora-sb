import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';

import type { DetailsPasswordForm } from '@features/account/schemas/detailsPassword.schema';
import { DetailsPasswordFormSchema } from '@features/account/schemas/detailsPassword.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

interface UpdateAccountDetailsPasswordParams {
  user: User;
  formData: DetailsPasswordForm;
}

export async function updateAccountDetailsPassword({ user, formData }: UpdateAccountDetailsPasswordParams) {
  const parsed = DetailsPasswordFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'UPDATE_PASSWORD_INVALID_DATA', 'Update password failed schema validation', user?.id);

    return { success: false };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email ?? '',
    password: formData.currentPassword,
  });

  if (signInError) {
    await createLogEvent('error', 'UPDATE_PASSWORD_CURRENT_INCORRECT', signInError.message, user.id);

    return { success: false };
  }

  const { error: updatePasswordError } = await supabase.auth.updateUser({
    password: formData.newPassword,
  });

  if (updatePasswordError) {
    await createLogEvent('error', 'UPDATE_PASSWORD_FAILED', updatePasswordError.message, user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_PASSWORD_SUCCESSFUL', 'Password updated', user?.id);

  return { success: true };
}
