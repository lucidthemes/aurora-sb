import WidgetTitle from '@components/Widgets/Title';

import usePostsWidget from './usePosts';
import PostsWidgetItem from './components/Item';
import PostsWidgetLoading from './components/Loading';
import PostsWidgetError from './components/Error';

interface PostsWidgetProps {
  title?: string;
  limit?: number;
  style?: 'small' | 'wide';
  location?: 'sidebar' | 'footer';
}

export default function PostsWidget({ title = '', limit = 3, style = 'wide', location }: PostsWidgetProps) {
  const postsWidgetQuery = usePostsWidget(limit);

  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      {postsWidgetQuery.isPending && <PostsWidgetLoading style={style} location={location} />}
      {postsWidgetQuery.isSuccess && postsWidgetQuery.data ? (
        <ul className="flex flex-col gap-y-8" role="list" aria-label="Widget posts">
          {postsWidgetQuery.data.map((post) => (
            <PostsWidgetItem key={post.id} post={post} style={style} />
          ))}
        </ul>
      ) : (
        <PostsWidgetError location={location} />
      )}
    </section>
  );
}
