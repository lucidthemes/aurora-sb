export default function PostsWidgetError({ location }: { location?: 'sidebar' | 'footer' }) {
  const colorClass = location === 'sidebar' ? 'bg-pampas' : 'bg-spring-wood';

  return <p className={`rounded-md p-5 text-center ${colorClass}`}>No posts found</p>;
}
