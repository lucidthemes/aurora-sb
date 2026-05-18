import { useParams, Navigate } from 'react-router-dom';

import { PageLayout, PageSidebarLayout, PageSidebarLayoutLoading } from '@components/Layout/PageLayout';
import { Sidebar } from '@components/Layout/Sidebar';
import useSinglePost from '@features/blog/blogPost/useSinglePost';
import BlogPostHeader from '@features/blog/blogPost/components/header';
import BlogPost from '@features/blog/blogPost';
import BlogPostLoading from '@features/blog/blogPost/components/Loading';

export default function SinglePost() {
  const { slug } = useParams();

  const blogPostQuery = useSinglePost(slug ?? '');

  if (blogPostQuery.isPending) return <PageSidebarLayoutLoading content={<BlogPostLoading />} sidebarPosition="right" />;

  if ((blogPostQuery.isSuccess && !blogPostQuery.data) || blogPostQuery.isError) return <Navigate to="/404" replace />;

  const post = blogPostQuery.data;

  const postSidebar = post?.options?.sidebar ?? 'right';
  const postHeaderBesideSidebar = post?.options?.header?.besideSidebar ?? true;

  return (
    <>
      {blogPostQuery.isSuccess && post && (
        <article id={`post-${post?.id}`} className="flex flex-col gap-y-10">
          {postSidebar === 'hidden' && (
            <>
              <BlogPostHeader post={post} />
              <PageLayout>
                <div className="flex flex-col gap-y-10">
                  <BlogPost post={post} />
                </div>
              </PageLayout>
            </>
          )}
          {(postSidebar === 'right' || postSidebar === 'left') && (
            <>
              {!postHeaderBesideSidebar && <BlogPostHeader post={post} />}
              <PageSidebarLayout
                content={
                  <div className="flex flex-col gap-y-10">
                    {postHeaderBesideSidebar && <BlogPostHeader post={post} />}
                    <BlogPost post={post} />
                  </div>
                }
                sidebar={<Sidebar />}
                sidebarPosition={postSidebar}
              />
            </>
          )}
        </article>
      )}
    </>
  );
}
