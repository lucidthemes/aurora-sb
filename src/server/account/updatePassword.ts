import { supabase } from '@lib/supabase/client';
import { DetailsPasswordFormReturnSchema } from '@schemas/account/detailsPassword.schema';
import type { DetailsPasswordForm, DetailsPasswordFormReturn } from '@schemas/account/detailsPassword.schema';
import { FetchError } from '@services/errors/fetchError';

export async function updateAccountDetailsPassword(formData: DetailsPasswordForm): Promise<DetailsPasswordFormReturn> {
  const { data, error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    throw new FetchError('UPDATE_PASSWORD_FAILED', error.message);
  }

  if (!data.user) {
    throw new FetchError('UPDATE_PASSWORD_NO_USER', 'No user found');
  }

  const parsed = DetailsPasswordFormReturnSchema.safeParse(data.user.email);

  if (!parsed.success) {
    throw new FetchError('UPDATE_PASSWORD_INVALID_DATA', 'Update password failed schema validation');
  }

  return parsed.data;
}
