import { supabase } from '@lib/supabase/client';
import type { DetailsEmailForm } from '@schemas/account/detailsEmail.schema';
import { FetchError } from '@services/errors/fetchError';

export async function updateAccountDetailsEmail(formData: DetailsEmailForm) {
  const { error } = await supabase.auth.updateUser({
    email: formData.email,
  });

  if (error) {
    throw new FetchError('UPDATE_EMAIL_FAILED', error.message);
  }
}
