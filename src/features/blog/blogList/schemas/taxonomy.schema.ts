import { z } from 'zod';

/* Used for category, tag, and author taxonomy pages */

export const PostTaxonomySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
});

export type PostTaxonomy = z.infer<typeof PostTaxonomySchema>;
