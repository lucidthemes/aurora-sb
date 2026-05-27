import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const AboutWidgetSchema = WidgetSchema.extend({
  type: z.literal('about'),
  backgroundImage: z.string().optional(),
  authorImage: z.string().optional(),
  heading: z.string().optional(),
  content: z.string().optional(),
  link: z.string().optional(),
  social: z.boolean().optional(),
  centered: z.boolean().optional(),
  padding: z.boolean().optional(),
});

export type AboutWidget = z.infer<typeof AboutWidgetSchema>;
