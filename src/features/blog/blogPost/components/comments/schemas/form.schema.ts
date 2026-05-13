import { z } from 'zod';

export const CommentFormSchema = z.object({
  comment: z.string().min(1, 'Please enter a comment'),
  name: z.string().min(1, 'Please enter a name'),
});

export type CommentForm = z.infer<typeof CommentFormSchema>;
