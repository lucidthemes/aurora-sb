import WidgetTitle from '@components/Widgets/Title';

import usePosts from './usePosts';
import PostsWidgetItem from './components/Item';
import PostsWidgetLoading from './components/Loading';
import PostsWidgetError from './components/Error';

interface PostsWidgetProps {
  title?: string;
  limit: number;
  category?: number;
  style?: 'small' | 'wide';
  location?: 'sidebar' | 'footer';
}

export default function PostsWidget({ title = '', limit = 3, category, style = 'wide', location }: PostsWidgetProps) {
  const posts = usePosts(limit, category);

  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      {posts.isPending && <PostsWidgetLoading style={style} location={location} />}
      {!posts.isError && posts.data ? (
        <ul className="flex flex-col gap-y-8" role="list" aria-label="Widget posts">
          {posts.data.map((post) => (
            <PostsWidgetItem key={post.id} post={post} style={style} />
          ))}
        </ul>
      ) : (
        <PostsWidgetError location={location} />
      )}
    </section>
  );
}
