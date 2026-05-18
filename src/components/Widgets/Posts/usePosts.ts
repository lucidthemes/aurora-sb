import { useQuery } from '@tanstack/react-query';

import { getPostsWidgetPosts } from './getPosts';
import type { PostsWidgetPost } from './posts.schema';

export default function usePostsWidget(limit?: number) {
  const postsWidgetQuery = useQuery<PostsWidgetPost[] | null>({
    queryKey: ['postsWidget', limit],
    queryFn: () => getPostsWidgetPosts(limit),
  });

  return postsWidgetQuery;
}
