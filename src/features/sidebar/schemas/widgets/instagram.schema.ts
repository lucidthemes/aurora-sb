import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const InstagramWidgetSchema = WidgetSchema.extend({
  type: z.literal('instagram'),
  feedId: z.uuid().optional(),
});

export type InstagramWidget = z.infer<typeof InstagramWidgetSchema>;
