import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { NavigationSchema } from './navigation.schema';
import type { Navigation } from './navigation.schema';

export async function getNavigation(createdDate: string): Promise<{ previousPost?: Navigation | null; nextPost?: Navigation | null } | null> {
  const { data: previousPostData, error: previousPostError } = await supabase
    .from('posts')
    .select('title, slug')
    .lt('created_at', createdDate)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: nextPostData, error: nextPostError } = await supabase
    .from('posts')
    .select('title, slug')
    .gt('created_at', createdDate)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (previousPostError) {
    await createLogEvent('error', 'FETCH_POST_NAVIGATION_PREVIOUS_FAILED', previousPostError.message);

    return null;
  }

  if (nextPostError) {
    await createLogEvent('error', 'FETCH_POST_NAVIGATION_NEXT_FAILED', nextPostError.message);

    return null;
  }

  const previousParsed = NavigationSchema.safeParse(previousPostData);
  const nextParsed = NavigationSchema.safeParse(nextPostData);

  if (previousPostData && !previousParsed.success) {
    await createLogEvent('error', 'FETCH_POST_NAVIGATION_PREVIOUS_INVALID_DATA', 'Fetch post navigation previous failed schema validation');

    return null;
  }

  if (nextPostData && !nextParsed.success) {
    await createLogEvent('error', 'FETCH_POST_NAVIGATION_NEXT_INVALID_DATA', 'Fetch post navigation previous failed schema validation');

    return null;
  }

  return { previousPost: previousParsed.data, nextPost: nextParsed.data };
}
