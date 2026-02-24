import { supabase } from '@lib/supabase/client';

import type { NewsletterForm } from '@schemas/newsletter/newsletter.schema';
import { FetchError } from '@services/errors/fetchError';

export async function createNewsletterSubscriber(formData: NewsletterForm) {
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: formData.email });

  if (error) {
    throw new FetchError('CREATE_NEWSLETTER_SUBSCRIBER_FAILED', error.message);
  }
}
