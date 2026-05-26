import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const ProductsWidgetSchema = WidgetSchema.extend({
  type: z.literal('products'),
  limit: z.int().positive().optional(),
  style: z.enum(['small', 'wide']).optional(),
  location: z.enum(['sidebar', 'footer']).optional(),
});

export type ProductsWidget = z.infer<typeof ProductsWidgetSchema>;
