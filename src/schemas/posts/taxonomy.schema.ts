import { z } from 'zod';

/* Used for category, tag, and author taxonomies */

export const PostTaxonomySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  created_at: z.coerce.date(),
});

export type PostTaxonomy = z.infer<typeof PostTaxonomySchema>;
