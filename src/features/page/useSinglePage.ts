import { useQuery } from '@tanstack/react-query';

import { getPage } from './getPage';

export default function useSinglePage(slug: string) {
  const singlePageQuery = useQuery({
    queryKey: ['singlePage', slug],
    queryFn: () => getPage(slug),
  });

  return singlePageQuery;
}
