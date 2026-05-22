import { Link } from 'react-router-dom';

import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Posts } from '../../schemas/posts.schema';

import Content from './Content';

interface BlogListItemWideProps {
  post: Posts;
  excerptLength: number;
  mediaClasses: string;
  contentClasses: string;
}

export default function BlogListItemWide({ post, excerptLength, mediaClasses, contentClasses }: BlogListItemWideProps) {
  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  return (
    <article className="flex flex-col overflow-hidden rounded-md">
      {post.media && mediaUrl && (
        <div className={mediaClasses}>
          <div>
            <Link to={`/blog/${post.slug}`}>
              <img src={mediaUrl} alt={post.media.alt_text ?? post.title} />
            </Link>
          </div>
        </div>
      )}
      <Content post={post} excerptLength={excerptLength} contentClasses={contentClasses} />
    </article>
  );
}
