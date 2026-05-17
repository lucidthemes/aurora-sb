import { Link } from 'react-router-dom';

import { dateFormat } from '@utils/formatters';

import type { PostAuthor } from './blogPost/schemas/author.schema';

export default function MetaList({ author, date }: { author?: PostAuthor | null; date?: string }) {
  let formattedDate;

  if (date) formattedDate = dateFormat(date);

  return (
    <div className="flex flex-wrap gap-y-2.5 text-sm/5 tracking-xwide text-boulder uppercase">
      {author && (
        <span className="author peer">
          <Link to={`/author/${author.slug}`} className="transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark">
            {author.name}
          </Link>
        </span>
      )}
      {date && (
        <time className="peer-[.author]:before:mr-1 peer-[.author]:before:inline-block peer-[.author]:before:content-[',']" dateTime={date}>
          {formattedDate}
        </time>
      )}
    </div>
  );
}
