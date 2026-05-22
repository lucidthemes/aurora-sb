import { useQuery } from '@tanstack/react-query';

import type { PostTaxonomy } from '../schemas/taxonomy.schema';
import { getTaxonomy } from '../server/getTaxonomy';

export default function useBlogListTaxonomy({ taxonomy, slug }: { taxonomy: 'category' | 'tag' | 'author'; slug: string }) {
  const blogListTaxonomyQuery = useQuery<PostTaxonomy | null>({
    queryKey: ['blogListTaxonomy', taxonomy, slug],
    queryFn: () => getTaxonomy({ taxonomy, slug }),
  });

  return blogListTaxonomyQuery;
}
