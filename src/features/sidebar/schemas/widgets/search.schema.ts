import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const SearchWidgetSchema = WidgetSchema.extend({
  type: z.literal('search'),
});

export type SearchWidget = z.infer<typeof SearchWidgetSchema>;
