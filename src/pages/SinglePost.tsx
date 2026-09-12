import { useParams, Navigate } from 'react-router-dom';

import { PageLayout, PageSidebarLayout, PageSidebarLayoutLoading } from '@components/Layout/PageLayout';
import PageContent from '@components/content';
import Container from '@components/Layout/Container';
import useSinglePost from '@features/blog/blogPost/useSinglePost';
import BlogPostHeader from '@features/blog/blogPost/components/header';
import BlogPost from '@features/blog/blogPost';
import BlogPostLoading from '@features/blog/blogPost/components/Loading';
import Sidebar from '@features/sidebar';

export default function SinglePost() {
  const { slug } = useParams();

  const blogPostQuery = useSinglePost(slug ?? '');

  if (blogPostQuery.isPending)
    return <PageSidebarLayoutLoading content={<BlogPostLoading />} sidebarPosition="right" />;

  if (blogPostQuery.isSuccess && !blogPostQuery.data) return <Navigate to="/404?returnto=blog" replace />;

  if (blogPostQuery.isSuccess && blogPostQuery.data) {
    const post = blogPostQuery.data;

    const postOptions = post?.options;
    const postHeaderBesideSidebar = postOptions?.header?.besideSidebar ?? true;
    const postSidebarShow = postOptions?.sidebar.show ?? true;
    const postSidebarOption = postOptions?.sidebar.option ?? 'sidebar-1';
    const postSidebarPosition = postOptions?.sidebar.position ?? 'right';

    return (
      <article className="flex flex-col gap-y-10">
        {!postSidebarShow && (
          <>
            <BlogPostHeader post={post} />
            <PageLayout fullWidth={true}>
              <div className="flex flex-col gap-y-10">
                {post.content && <PageContent content={post.content} fullWidth={true} />}
                <Container>
                  <div className="flex flex-col gap-y-10">
                    <BlogPost post={post} />
                  </div>
                </Container>
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
                  {post.content && <PageContent content={post.content} />}
                  <BlogPost post={post} />
                </div>
              }
              sidebar={<Sidebar name={postSidebarOption} />}
              sidebarPosition={postSidebarPosition}
            />
          </>
        )}
      </article>
    );
  }
}
