import type { ReactNode } from 'react';

import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Post } from '../../../schemas/post.schema';

export default function BlogPostHeaderOverlayLayout({ post, content }: { post: Post; content: ReactNode }) {
  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  return (
    <div className="flex h-125 items-center justify-center rounded-sm bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${mediaUrl})` }}>
      <div className="w-[85%] rounded-sm bg-white p-5 md:w-[65%] md:p-7.5 lg:w-1/2 lg:p-10">{content}</div>
    </div>
  );
}
