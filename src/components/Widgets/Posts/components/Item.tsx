import { Link } from 'react-router-dom';

import MetaList from '@features/blog/MetaList';
import type { Post } from '@typings/posts/post';

export default function PostsWidgetItem({ post, style }: { post: Post; style?: 'small' | 'wide' }) {
  const itemClasses = style === 'wide' ? 'flex-col gap-y-5' : 'flex-row gap-x-5';
  const imageClass = style === 'small' ? 'basis-[40%]' : '';
  const contentClass = style === 'small' ? 'basis-[60%]' : '';

  return (
    <li key={post.id} className={`flex ${itemClasses}`} role="listitem">
      <div className={imageClass}>
        <Link to={`/blog/${post.slug}`}>
          <img src={post.image} alt={post.title} className="rounded-md" />
        </Link>
      </div>
      <header className={`flex flex-col gap-y-4 ${contentClass}`}>
        <h4>
          <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            {post.title}
          </Link>
        </h4>
        <MetaList date={post.date} />
      </header>
    </li>
  );
}
