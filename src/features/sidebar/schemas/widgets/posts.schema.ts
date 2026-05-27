import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const PostsWidgetSchema = WidgetSchema.extend({
  type: z.literal('posts'),
  limit: z.int().positive().optional(),
  style: z.enum(['small', 'wide']).optional(),
  location: z.enum(['sidebar', 'footer']).optional(),
});

export type PostsWidget = z.infer<typeof PostsWidgetSchema>;
