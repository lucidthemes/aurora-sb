import { z } from 'zod';

export const TagsWidgetTagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export type TagsWidgetTag = z.infer<typeof TagsWidgetTagSchema>;
