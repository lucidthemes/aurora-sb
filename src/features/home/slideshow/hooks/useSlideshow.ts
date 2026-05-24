import { useQuery } from '@tanstack/react-query';

import { getSlideshow } from '../getSlideshow';

export default function useSlideshow({ limit, category }: { limit?: number; category?: string }) {
  const slideshowQuery = useQuery({
    queryKey: ['slideshow', limit, category],
    queryFn: () => getSlideshow({ limit, category }),
  });

  return slideshowQuery;
}
