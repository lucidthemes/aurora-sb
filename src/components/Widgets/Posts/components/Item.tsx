import { Link } from 'react-router-dom';

import MetaList from '@features/blog/MetaList';
import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { PostsWidgetPost } from '../posts.schema';

export default function PostsWidgetItem({ post, style }: { post: PostsWidgetPost; style?: 'small' | 'wide' }) {
  const itemClasses = style === 'wide' ? 'flex-col gap-y-5' : 'flex-row gap-x-5';
  const imageClass = style === 'small' ? 'basis-[40%]' : '';
  const contentClass = style === 'small' ? 'basis-[60%]' : '';

  let mediaUrl = '';

  if (post.media) mediaUrl = getPublicMediaUrl(post.media.storage_path);

  return (
    <li key={post.id} className={`flex ${itemClasses}`} role="listitem">
      {post.media && mediaUrl && (
        <div className={imageClass}>
          <Link to={`/blog/${post.slug}`}>
            <img src={mediaUrl} alt={post.media?.alt_text ?? post.title} className="rounded-md" />
          </Link>
        </div>
      )}
      <header className={`flex flex-col gap-y-4 ${contentClass}`}>
        <h4>
          <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            {post.title}
          </Link>
        </h4>
        <MetaList date={post.created_at} />
      </header>
    </li>
  );
}
