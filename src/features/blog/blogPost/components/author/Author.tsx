import { Link } from 'react-router-dom';

import type { PostAuthor } from '../../schemas/author.schema';

export default function BlogPostAuthor({ author }: { author: PostAuthor }) {
  if (!author) return null;

  return (
    <div className="flex flex-col items-center gap-y-6 rounded-md bg-spring-wood py-5 md:py-7.5 lg:py-10" role="region" aria-label="About the author">
      <div className="max-w-27.5">
        <img src="/images/author.jpg" alt={author.name} className="rounded-full border-4 border-pearl-bush" />
      </div>
      <div className="flex flex-col items-center gap-y-2.5 px-5 md:px-7.5 lg:px-10">
        <h4>
          <Link to={`/author/${author.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            {author.name}
          </Link>
        </h4>
        <p className="text-center text-boulder">{author.description}</p>
      </div>
    </div>
  );
}
