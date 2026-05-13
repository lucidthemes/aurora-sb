import { Link } from 'react-router-dom';

import MetaList from '@features/blog/MetaList';
import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { PostRelated } from '../../schemas/related.schema';

export default function BlogPostRelatedItem({ related }: { related: PostRelated }) {
  let mediaUrl = '';

  if (related.media) mediaUrl = getPublicMediaUrl(related.media.storage_path);

  return (
    <li className="nth-3:hidden lg:nth-3:block">
      <article className="h-full overflow-hidden rounded-md bg-pampas">
        {related.media && mediaUrl && (
          <div>
            <Link to={`/blog/${related.slug}`}>
              <img src={mediaUrl} alt={related.media.alt_text ?? ''} />
            </Link>
          </div>
        )}
        <header className="flex flex-col gap-y-4 p-5">
          <h4>
            <Link to={`/blog/${related.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {related.title}
            </Link>
          </h4>
          <MetaList date={related.created_at} />
        </header>
      </article>
    </li>
  );
}
