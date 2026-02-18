import { supabase } from '@lib/supabase/client';
import { DetailsEmailFormReturnSchema } from '@schemas/account/detailsEmail.schema';
import type { DetailsEmailForm, DetailsEmailFormReturn } from '@schemas/account/detailsEmail.schema';
import { FetchError } from '@services/errors/fetchError';

export async function updateAccountDetailsEmail(formData: DetailsEmailForm): Promise<DetailsEmailFormReturn> {
  const { data, error } = await supabase.auth.updateUser({
    email: formData.email,
  });

  if (error) {
    throw new FetchError('UPDATE_EMAIL_FAILED', error.message);
  }

  if (!data.user) {
    throw new FetchError('UPDATE_EMAIL_NO_USER', 'No user found');
  }

  const parsed = DetailsEmailFormReturnSchema.safeParse(data.user.email);

  if (!parsed.success) {
    throw new FetchError('UPDATE_EMAIL_INVALID_DATA', 'Update email failed schema validation');
  }

  return parsed.data;
}
