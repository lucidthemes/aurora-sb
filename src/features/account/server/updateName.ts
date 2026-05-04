import { supabase } from '@lib/supabase/client';
import type { User } from '@supabase/supabase-js';

import { createLogEvent } from '@lib/supabase/logEvent';

import type { DetailsNameForm } from '../schemas/detailsName.schema';
import { DetailsNameFormSchema } from '../schemas/detailsName.schema';

interface updateAccountDetailsNameParams {
  user: User;
  formData: DetailsNameForm;
}

export async function updateAccountDetailsName({ user, formData }: updateAccountDetailsNameParams) {
  const parsed = DetailsNameFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'UPDATE_NAME_INVALID_DATA', 'Update name failed schema validation', user?.id);

    return { success: false };
  }

  const { error } = await supabase
    .from('customers')
    .update({ first_name: formData.firstName, last_name: formData.lastName, updated_at: new Date() })
    .eq('id', user.id);

  if (error) {
    await createLogEvent('error', 'UPDATE_NAME_FAILED', error.message, user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_NAME_SUCCESSFUL', 'Name updated', user?.id);

  return { success: true };
}
