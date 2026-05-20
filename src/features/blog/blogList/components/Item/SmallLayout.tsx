import { Link } from 'react-router-dom';

import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Posts } from '../../schemas/posts.schema';

import Content from './Content';

interface BlogListItemSmallProps {
  post: Posts;
  excerptLength: number;
  mediaClasses: string;
  contentClasses: string;
}

export default function BlogListItemSmall({ post, excerptLength, mediaClasses, contentClasses }: BlogListItemSmallProps) {
  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  return (
    <article className="flex flex-col overflow-hidden rounded-md lg:flex-row">
      {post.media && mediaUrl && (
        <div className={mediaClasses}>
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
