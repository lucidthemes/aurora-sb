import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const NewsletterWidgetSchema = WidgetSchema.extend({
  type: z.literal('newsletter'),
});

export type NewsletterWidget = z.infer<typeof NewsletterWidgetSchema>;
