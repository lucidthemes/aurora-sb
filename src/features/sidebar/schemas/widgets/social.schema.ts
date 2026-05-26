import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const SocialWidgetSchema = WidgetSchema.extend({
  type: z.literal('social'),
});

export type SocialWidget = z.infer<typeof SocialWidgetSchema>;
