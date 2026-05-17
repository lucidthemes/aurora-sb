import { useQuery } from '@tanstack/react-query';

import { getNavigation } from './getNavigation';

export default function useNavigation({ postId, createdDate }: { postId: string; createdDate: string }) {
  const blogPostNavigationQuery = useQuery({
    queryKey: ['blogPostNavigation', postId, createdDate],
    queryFn: () => getNavigation(createdDate),
  });

  return blogPostNavigationQuery;
}
