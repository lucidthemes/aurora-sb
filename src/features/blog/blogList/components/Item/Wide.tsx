import { Link } from 'react-router-dom';

import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Posts } from '../../schemas/posts.schema';

import Content from './Content';

interface BlogListItemWideProps {
  post: Posts;
  isFirstPost: boolean;
  style: string;
  excerptLength: number;
}

export default function BlogListItemWide({ post, isFirstPost, style, excerptLength }: BlogListItemWideProps) {
  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  let contentClasses = 'p-5 md:p-7.5';

  if (style === 'wide' || (style.includes('wide-') && isFirstPost)) {
    contentClasses += ' lg:p-10';
  } else {
    if (style.includes('grid-2')) {
      contentClasses += ' lg:p-10';
    }
    if (style.includes('grid-3')) {
    }
    if (style.includes('grid-4')) {
      contentClasses += ' lg:p-5';
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-md">
      {post.media && mediaUrl && (
        <Link to={`/blog/${post.slug}`}>
          <img src={mediaUrl} alt={post.media.alt_text ?? post.title} />
        </Link>
      )}
      <Content post={post} excerptLength={excerptLength} contentClasses={contentClasses} />
    </article>
  );
}
