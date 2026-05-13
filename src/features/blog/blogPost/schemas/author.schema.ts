import { z } from 'zod';

export const PostAuthorSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
});

export type PostAuthor = z.infer<typeof PostAuthorSchema>;
