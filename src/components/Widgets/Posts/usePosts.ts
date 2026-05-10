import { useQuery } from '@tanstack/react-query';

import { getPosts } from '@server/posts/getPosts';
import type { Post } from '@typings/posts/post';

export default function usePosts(limit: number, category?: number) {
  const postsWidgetQuery = useQuery<Post[] | null>({
    queryKey: ['postsWidget', limit, category],
    queryFn: () => getPosts(limit, category),
  });

  return postsWidgetQuery;
}
