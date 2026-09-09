import { z } from 'zod';

export const WidgetSchema = z.object({
  id: z.uuid(),
  title: z.string().optional(),
});

export type Widget = z.infer<typeof WidgetSchema>;
