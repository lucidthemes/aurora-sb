import { useQuery } from '@tanstack/react-query';

import { getPost } from './server/getPost';

export default function useSinglePost(slug: string) {
  const blogPostQuery = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => getPost(slug),
  });

  return blogPostQuery;
}
