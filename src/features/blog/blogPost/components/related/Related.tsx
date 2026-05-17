import SectionHeading from '@components/UI/SectionHeading';

import type { PostRelated } from '../../schemas/related.schema';
import BlogPostRelatedItem from './Item';

export default function BlogPostRelated({ related }: { related: PostRelated[] }) {
  if (!related || related.length === 0) return null;

  return (
    <section className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      <SectionHeading heading="You may also like" headingLevel="3" />
      <ul className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {related.map((related) => (
          <BlogPostRelatedItem key={related.id} related={related} />
        ))}
      </ul>
    </section>
  );
}
