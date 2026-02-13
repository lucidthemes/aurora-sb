import { supabase } from '@lib/supabase/client';
import { ResetPasswordFormReturnSchema } from '@schemas/auth/resetPassword.schema';
import type { ResetPasswordForm, ResetPasswordFormReturn } from '@schemas/auth/resetPassword.schema';
import { FetchError } from '@services/errors/fetchError';

export async function resetPassword(formData: ResetPasswordForm): Promise<ResetPasswordFormReturn> {
  const { data, error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    throw new FetchError('RESET_PASSWORD_FAILED', error.message);
  }

  if (!data.user) {
    throw new FetchError('RESET_PASSWORD_NO_USER', 'No user found');
  }

  const parsed = ResetPasswordFormReturnSchema.safeParse(data.user.email);

  if (!parsed.success) {
    throw new FetchError('RESET_PASSWORD_INVALID_DATA', 'Reset password failed schema validation');
  }

  return parsed.data;
}
