import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { SidebarSchema } from './schemas/sidebar.schema';
import type { Sidebar } from './schemas/sidebar.schema';

export async function getSidebar(name: string): Promise<Sidebar | null> {
  const { data, error } = await supabase.from('sidebars').select('name, title, widgets').eq('name', name).maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_SIDEBAR_FAILED', error.message);

    return null;
  }

  const parsed = SidebarSchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_SIDEBAR_INVALID_DATA', 'Fetch sidebar failed schema validation');

    return null;
  }

  return parsed.data;
}
