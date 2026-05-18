import { z } from 'zod';

export const PostsWidgetPostSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
  media: z
    .object({
      storage_path: z.string(),
      alt_text: z.string().nullable(),
    })
    .nullable(),
  created_at: z.string(),
});

export type PostsWidgetPost = z.infer<typeof PostsWidgetPostSchema>;
