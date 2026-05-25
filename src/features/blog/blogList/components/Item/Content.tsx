import { Link } from 'react-router-dom';

import Button from '@components/UI/Button';
import { textTruncateByWords } from '@utils/formatters';

import CategoryList from '../../../CategoryList';
import MetaList from '../../../MetaList';

import type { Posts } from '../../schemas/posts.schema';

interface ContentProps {
  post: Posts;
  excerptLength: number;
  contentClasses: string;
}

export default function Content({ post, excerptLength, contentClasses }: ContentProps) {
  return (
    <div className={`flex flex-col gap-y-8 bg-white ${contentClasses}`}>
      <header className="flex flex-col gap-y-5">
        {post.categories && <CategoryList categories={post.categories} />}
        <h2>
          <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            {post.title}
          </Link>
        </h2>
        <MetaList author={post.author} date={post.created_at} />
      </header>
      {post.excerpt && <p>{textTruncateByWords(post.excerpt, excerptLength)}</p>}
      <Button to={`/blog/${post.slug}`} className="max-w-fit">
        Read More
      </Button>
    </div>
  );
}
