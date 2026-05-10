import { useQuery } from '@tanstack/react-query';

import type { PostTaxonomy } from '@schemas/posts/taxonomy.schema';

import getBlogListTaxonomy from '../server/getBlogListTaxonomy';

export default function useBlogListTaxonomy({ taxonomy, slug }: { taxonomy: 'category' | 'tag' | 'author'; slug: string }) {
  const blogListTaxonomyQuery = useQuery<PostTaxonomy | null>({
    queryKey: ['blogListtaxonomy', taxonomy, slug],
    queryFn: () => getBlogListTaxonomy({ taxonomy, slug }),
  });

  return blogListTaxonomyQuery;
}
