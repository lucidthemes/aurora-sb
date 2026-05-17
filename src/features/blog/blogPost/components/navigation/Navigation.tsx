import useNavigation from './useNavigation';
import BlogPostNavigationLoading from './components/Loading';
import BlogPostNavigationPrevious from './components/Previous';
import BlogPostNavigationNext from './components/Next';

export default function BlogPostNavigation({ postId, createdDate }: { postId: string; createdDate: string }) {
  const blogPostNavigationQuery = useNavigation({ postId, createdDate });

  if (blogPostNavigationQuery.isPending) return <BlogPostNavigationLoading />;

  if ((blogPostNavigationQuery.isSuccess && !blogPostNavigationQuery.data) || blogPostNavigationQuery.isError) return null;

  const previousPost = blogPostNavigationQuery.data?.previousPost;
  const nextPost = blogPostNavigationQuery.data?.nextPost;

  return (
    <div className="flex justify-between" role="region" aria-label="Post navigation">
      {previousPost && <BlogPostNavigationPrevious previousPost={previousPost} />}
      {nextPost && <BlogPostNavigationNext nextPost={nextPost} />}
    </div>
  );
}
