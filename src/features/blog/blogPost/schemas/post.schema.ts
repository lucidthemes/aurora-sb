import { z } from 'zod';

import { ContentBlockSchema } from '@schemas/contentBlock.schema';

import { PostAuthorSchema } from './author.schema';
import { PostCategorySchema } from './category.schema';
import { PostTagSchema } from './tag.schema';
import { PostRelatedSchema } from './related.schema';
import { PostCommentSchema } from './comment.schema';
import { PostOptionsSchema } from './options.schema';

export const PostSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
  author: PostAuthorSchema,
  media: z
    .object({
      storage_path: z.string(),
      alt_text: z.string().nullable(),
    })
    .nullable(),
  categories: z.array(PostCategorySchema),
  tags: z.array(PostTagSchema),
  related: z.array(PostRelatedSchema),
  comments: z.array(PostCommentSchema),
  content: z.array(ContentBlockSchema).nullable(),
  status: z.enum(['draft', 'published']),
  created_at: z.string(),
  updated_at: z.string(),
  options: PostOptionsSchema,
});

export type Post = z.infer<typeof PostSchema>;
