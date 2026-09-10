import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const TagsWidgetSchema = WidgetSchema.extend({
  type: z.literal('tags'),
  limit: z.int().min(0).optional(),
});

export type TagsWidget = z.infer<typeof TagsWidgetSchema>;
