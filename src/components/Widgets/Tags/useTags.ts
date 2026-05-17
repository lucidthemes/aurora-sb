import { useQuery } from '@tanstack/react-query';

import { getTagsWidgetTags } from './getTags';
import type { TagsWidgetTag } from './tags.schema';

export default function useTagsWidget(limit?: number) {
  const tagsWidgetQuery = useQuery<TagsWidgetTag[] | null>({
    queryKey: ['tagsWidget', limit],
    queryFn: () => getTagsWidgetTags(limit),
  });

  return tagsWidgetQuery;
}
