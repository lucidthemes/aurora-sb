import { z } from 'zod';

import { PostSchema } from '../../blogPost/schemas/post.schema';

export const PostsSchema = PostSchema.omit({ related: true, comments: true, content: true, options: true }).extend({
  excerpt: z.string().nullable(),
});

export type Posts = z.infer<typeof PostsSchema>;
