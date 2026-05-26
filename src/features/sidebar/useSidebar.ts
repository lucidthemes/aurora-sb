import { useQuery } from '@tanstack/react-query';

import { getSidebar } from './getSidebar';

export default function useSidebar(name: string) {
  const sidebarQuery = useQuery({
    queryKey: ['sidebar', name],
    queryFn: () => getSidebar(name),
  });

  return sidebarQuery;
}
