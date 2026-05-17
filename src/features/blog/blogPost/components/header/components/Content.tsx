import CategoryList from '@features/blog/CategoryList';
import MetaList from '@features/blog/MetaList';

import type { Post } from '../../../schemas/post.schema';

export default function BlogPostHeaderContent({ post, align = 'center' }: { post: Post; align: string }) {
  const alignClass = align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';

  return (
    <div className={`flex flex-col items-${alignClass} gap-y-4 text-${align}`}>
      {post.categories && post.categories.length > 0 && <CategoryList categories={post.categories} />}
      {post.title && <h1>{post.title}</h1>}
      <MetaList author={post.author} date={post.created_at} />
    </div>
  );
}
