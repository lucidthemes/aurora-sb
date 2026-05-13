import { z } from 'zod';

export const PostCategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export type PostCategory = z.infer<typeof PostCategorySchema>;
