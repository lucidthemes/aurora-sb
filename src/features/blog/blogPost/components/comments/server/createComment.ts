import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { CommentFormSchema } from '../schemas/form.schema';
import type { CommentForm } from '../schemas/form.schema';

export default async function createComment({ postId, formData, replyId }: { postId: string; formData: CommentForm; replyId: string | null }) {
  const parsed = CommentFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'CREATE_POST_COMMENT_INVALID_DATA', 'Create post comment failed schema validation');

    return { success: false };
  }

  const { error } = await supabase.from('posts_comments').insert({ post_id: postId, reply_to: replyId, name: formData.name, comment: formData.comment });

  if (error) {
    await createLogEvent('error', 'CREATE_POST_COMMENT_FAILED', error.message);

    return { success: false };
  }

  return { success: true };
}
