import { useQuery } from '@tanstack/react-query';

import type { Post } from './schemas/post.schema';
import { getPost } from './server/getPost';

export default function useSinglePost(slug: string) {
  const blogPostQuery = useQuery<Post | null>({
    queryKey: ['blogPost', slug],
    queryFn: () => getPost(slug),
  });

  return blogPostQuery;
}
