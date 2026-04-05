import { supabase } from '@lib/supabase/client';

import type { NewsletterForm } from '@schemas/newsletter/newsletter.schema';
import { createLogEvent } from '@lib/supabase/logEvent';

export async function createNewsletterSubscriber(formData: NewsletterForm) {
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: formData.email });

  if (error) {
    await createLogEvent('error', 'CREATE_NEWSLETTER_SUBSCRIBER_FAILED', error.message);

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_NEWSLETTER_SUBSCRIBER_SUCCESSFUL', 'Newsletter subscriber: ' + formData.email);

  return { success: true };
}
