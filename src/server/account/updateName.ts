import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DetailsNameForm } from '@schemas/account/detailsName.schema';
import { createLogEvent } from '@services/logs/createLogEvent';

interface updateAccountDetailsNameParams {
  user: User;
  formData: DetailsNameForm;
}

export async function updateAccountDetailsName({ user, formData }: updateAccountDetailsNameParams) {
  const { error } = await supabase
    .from('customers')
    .update({ first_name: formData.firstName, last_name: formData.lastName, updated_at: new Date() })
    .eq('id', user.id);

  if (error) {
    createLogEvent('error', 'UPDATE_NAME_FAILED', error.message, user?.id);

    return { success: false };
  }

  createLogEvent('info', 'UPDATE_NAME_SUCCESSFUL', 'Name updated', user?.id);

  return { success: true };
}
