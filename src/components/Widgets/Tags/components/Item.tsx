import { Link } from 'react-router-dom';

import type { TagsWidgetTag } from '../tags.schema';

export default function TagsWidgetItem({ tag }: { tag: TagsWidgetTag }) {
  return (
    <li key={tag.id} className="flex">
      <Link
        to={`/tag/${tag.slug}`}
        className="rounded-md bg-pampas px-4 py-2 text-xs/4 tracking-xwide text-shark uppercase transition-colors duration-300 ease-in-out hover:bg-shark hover:text-white focus:bg-shark focus:text-white"
      >
        {tag.name}
      </Link>
    </li>
  );
}
