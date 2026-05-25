import { Link } from 'react-router-dom';

import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Posts } from '../../schemas/posts.schema';

import Content from './Content';

interface BlogListItemSmallProps {
  post: Posts;
  style: string;
  excerptLength: number;
}

export default function BlogListItemSmall({ post, style, excerptLength }: BlogListItemSmallProps) {
  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  let mediaClass = 'basis-[100%]';
  let contentClasses = 'p-5 md:p-7.5';

  if (mediaUrl) {
    if (style.includes('small-small')) {
      mediaClass = 'lg:basis-[40%]';
      contentClasses += ' lg:basis-[60%]';
    } else if (style.includes('small-half')) {
      mediaClass = 'lg:basis-1/2';
      contentClasses += ' lg:basis-1/2';
    } else if (style.includes('small-large')) {
      mediaClass = 'lg:basis-[60%]';
      contentClasses += ' lg:basis-[40%]';
    }
  } else {
    contentClasses += ' basis-[100%]';
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-md lg:flex-row">
      {post.media && mediaUrl && (
        <div className={mediaClass}>
          <div className="h-full bg-none lg:bg-cover lg:bg-center" style={{ backgroundImage: `url(${mediaUrl})` }}>
            <Link to={`/blog/${post.slug}`} className="block h-full">
              <img src={mediaUrl} alt={post.media.alt_text ?? post.title} className="w-full lg:hidden" />
            </Link>
          </div>
        </div>
      )}
      <Content post={post} excerptLength={excerptLength} contentClasses={contentClasses} />
    </article>
  );
}
