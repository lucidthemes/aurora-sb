import { Link } from 'react-router-dom';

import type { PostTag } from '../../schemas/tag.schema';

export default function BlogPostTags({ tags }: { tags: PostTag[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap justify-center gap-4" aria-label="Post tags">
      {tags.map((tag) => (
        <li key={tag.id} className="flex">
          <Link
            to={`/tag/${tag.slug}`}
            className="rounded-md bg-white px-4.5 py-2 text-xs/4 tracking-xwide text-shark uppercase transition-colors duration-300 ease-in-out hover:bg-shark hover:text-white focus:bg-shark focus:text-white"
          >
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
