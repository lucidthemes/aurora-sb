import { supabase } from '@lib/supabase/client';
import type { DetailsPasswordForm } from '@schemas/account/detailsPassword.schema';
import { FetchError } from '@services/errors/fetchError';

export async function updateAccountDetailsPassword(formData: DetailsPasswordForm) {
  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    throw new FetchError('UPDATE_PASSWORD_FAILED', error.message);
  }
}
