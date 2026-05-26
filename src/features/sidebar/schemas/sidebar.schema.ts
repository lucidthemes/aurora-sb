import { z } from 'zod';

import { WidgetsSchema } from './widgets/widgets.schema';

export const SidebarSchema = z.object({
  name: z.string(),
  title: z.string(),
  widgets: z.array(WidgetsSchema).nullable(),
});

export type Sidebar = z.infer<typeof SidebarSchema>;
