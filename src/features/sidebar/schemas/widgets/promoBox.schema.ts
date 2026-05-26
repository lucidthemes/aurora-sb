import { z } from 'zod';

import { WidgetSchema } from './widget.schema';

export const PromoBoxWidgetSchema = WidgetSchema.extend({
  type: z.literal('promoBox'),
  image: z.string().optional(),
  heading: z.string().optional(),
  subHeading: z.string().optional(),
  link: z.string().optional(),
  position: z.enum(['bottom', 'top', 'center']).optional(),
});

export type PromoBoxWidget = z.infer<typeof PromoBoxWidgetSchema>;
