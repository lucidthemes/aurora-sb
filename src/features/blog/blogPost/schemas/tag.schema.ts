import { z } from 'zod';

export const PostTagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export type PostTag = z.infer<typeof PostTagSchema>;
