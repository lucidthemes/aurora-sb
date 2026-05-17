import type { ReactNode } from 'react';

import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Post } from '../../../schemas/post.schema';
import type { PostOptions } from '../../../schemas/options.schema';

interface BlogPostHeaderOutsideLayoutProps {
  post: Post;
  content: ReactNode;
  layout: PostOptions['header']['layout'];
}

export default function BlogPostHeaderOutsideLayout({ post, content, layout }: BlogPostHeaderOutsideLayoutProps) {
  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  return (
    <div className="flex flex-col gap-y-10">
      {layout === 'outside-above' && content}
      {post.media && <img src={mediaUrl} alt={post.media.alt_text ?? post.title} className="rounded-md" />}
      {layout === 'outside-below' && content}
    </div>
  );
}
