import { useQuery } from '@tanstack/react-query';

import { getBanner } from './getBanner';

export default function useBanner(slug: string) {
  const bannerQuery = useQuery({
    queryKey: ['banner', slug],
    queryFn: () => getBanner(slug),
  });

  return bannerQuery;
}
