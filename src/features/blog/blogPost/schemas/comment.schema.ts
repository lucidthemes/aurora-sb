import { z } from 'zod';

export const PostCommentSchema = z.object({
  id: z.uuid(),
  reply_to: z.uuid().nullable(),
  name: z.string(),
  comment: z.string(),
  status: z.enum(['approved', 'pending', 'rejected']),
  created_at: z.string(),
});

export type PostComment = z.infer<typeof PostCommentSchema> & {
  replies?: PostComment[];
};
