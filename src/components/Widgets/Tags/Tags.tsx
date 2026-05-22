import WidgetTitle from '@components/Widgets/Title';

import useTags from './useTags';
import TagsWidgetItem from './components/Item';
import TagsWidgetLoading from './components/Loading';
import TagsWidgetError from './components/Error';

export default function TagsWidget({ title = '', limit }: { title?: string; limit?: number }) {
  const tagsWidgetQuery = useTags(limit);

  return (
    <div className="tag-widget">
      <WidgetTitle>{title}</WidgetTitle>
      {tagsWidgetQuery.isPending && <TagsWidgetLoading />}
      {tagsWidgetQuery.isSuccess && tagsWidgetQuery.data && tagsWidgetQuery.data.length > 0 ? (
        <ul className="flex flex-wrap gap-4" aria-label="Widget tags">
          {tagsWidgetQuery.data.map((tag) => (
            <TagsWidgetItem key={tag.id} tag={tag} />
          ))}
        </ul>
      ) : (
        <TagsWidgetError />
      )}
    </div>
  );
}
