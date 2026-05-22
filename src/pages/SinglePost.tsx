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

  if ((blogPostQuery.isSuccess && !blogPostQuery.data) || blogPostQuery.isError) return <Navigate to="/404?returnto=blog" replace />;

  const post = blogPostQuery.data;

  const postOptions = post?.options;
  const postHeaderBesideSidebar = postOptions?.header?.besideSidebar ?? true;
  const postSidebarShow = postOptions?.sidebar.show ?? true;
  const postSidebarPosition = postOptions?.sidebar.position ?? 'right';

  return (
    <>
      {blogPostQuery.isSuccess && post && (
        <article className="flex flex-col gap-y-10">
          {!postSidebarShow && (
            <>
              <BlogPostHeader post={post} />
              <PageLayout>
                <div className="flex flex-col gap-y-10">
                  <BlogPost post={post} />
                </div>
              </PageLayout>
            </>
          )}
          {postSidebarShow && (
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
                sidebarPosition={postSidebarPosition}
              />
            </>
          )}
        </article>
      )}
    </>
  );
}
