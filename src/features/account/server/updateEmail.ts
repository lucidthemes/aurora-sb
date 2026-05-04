import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';

import { createLogEvent } from '@lib/supabase/logEvent';

import type { DetailsEmailForm } from '../schemas/detailsEmail.schema';
import { DetailsEmailFormSchema } from '../schemas/detailsEmail.schema';

interface UpdateAccountDetailsEmailParams {
  user: User;
  formData: DetailsEmailForm;
}

export async function updateAccountDetailsEmail({ user, formData }: UpdateAccountDetailsEmailParams) {
  const parsed = DetailsEmailFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'UPDATE_EMAIL_INVALID_DATA', 'Update email failed schema validation', user?.id);

    return { success: false };
  }

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
