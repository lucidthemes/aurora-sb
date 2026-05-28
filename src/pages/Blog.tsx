import { useParams, useSearchParams, Navigate } from 'react-router-dom';

import { PageLayout, PageSidebarLayout, PageSidebarLayoutLoading } from '@components/Layout/PageLayout';
import BlogList from '@features/blog/blogList';
import BlogListLoading from '@features/blog/blogList/components/Loading';
import BlogListTaxonomyHeader from '@features/blog/blogList/components/taxonomy/Header';
import BlogListTaxonomyHeaderLoading from '@features/blog/blogList/components/taxonomy/HeaderLoading';
import useBlogListTaxonomy from '@features/blog/blogList/hooks/useBlogListTaxonomy';
import SearchForm from '@features/searchForm';
import Sidebar from '@features/sidebar';

export function Blog() {
  const [searchParams] = useSearchParams();
  const layout = searchParams.get('layout') || 'wide-small-small';

  return <PageSidebarLayout content={<BlogList style={layout} />} sidebar={<Sidebar name="sidebar-1" />} sidebarPosition="right" />;
}

export function BlogLeftSidebar() {
  return <PageSidebarLayout content={<BlogList style="wide-small-small" />} sidebar={<Sidebar name="sidebar-1" />} sidebarPosition="left" />;
}

export function BlogHiddenSidebar() {
  return (
    <PageLayout>
      <BlogList style="wide-small-small" />
    </PageLayout>
  );
}

export function BlogCategory() {
  const { slug } = useParams();

  const blogCategoryQuery = useBlogListTaxonomy({ taxonomy: 'category', slug: slug ?? '' });

  if (blogCategoryQuery.isPending)
    return (
      <PageSidebarLayoutLoading
        content={
          <>
            <BlogListTaxonomyHeaderLoading />
            <BlogListLoading />
          </>
        }
        sidebarPosition="right"
      />
    );

  if (blogCategoryQuery.isSuccess && !blogCategoryQuery.data) return <Navigate to="/404" replace />;

  if (blogCategoryQuery.isSuccess && blogCategoryQuery.data) {
    const category = blogCategoryQuery.data;

    return (
      <PageSidebarLayout
        content={
          <>
            <BlogListTaxonomyHeader heading={category.name} description={category.description} />
            <BlogList category={category.slug} style="wide-small-small" />
          </>
        }
        sidebar={<Sidebar name="sidebar-1" />}
        sidebarPosition="right"
      />
    );
  }
}

export function BlogTag() {
  const { slug } = useParams();

  const blogTagQuery = useBlogListTaxonomy({ taxonomy: 'tag', slug: slug ?? '' });

  if (blogTagQuery.isPending)
    return (
      <PageSidebarLayoutLoading
        content={
          <>
            <BlogListTaxonomyHeaderLoading />
            <BlogListLoading />
          </>
        }
        sidebarPosition="right"
      />
    );

  if (blogTagQuery.isSuccess && !blogTagQuery.data) return <Navigate to="/404" replace />;

  if (blogTagQuery.isSuccess && blogTagQuery.data) {
    const tag = blogTagQuery.data;

    return (
      <PageSidebarLayout
        content={
          <>
            <BlogListTaxonomyHeader heading={tag.name} description={tag.description} />
            <BlogList tag={tag.slug} style="wide-small-small" />
          </>
        }
        sidebar={<Sidebar name="sidebar-1" />}
        sidebarPosition="right"
      />
    );
  }
}

export function BlogSearch() {
  const [searchParams] = useSearchParams();
  const term = searchParams.get('term') ?? 'fashion';

  return (
    <PageSidebarLayout
      content={
        <>
          <header className="mb-10 flex flex-col gap-y-5">
            <h1>Search results: {term}</h1>
            <SearchForm />
          </header>
          <BlogList search={term} style="wide-small-small" />
        </>
      }
      sidebar={<Sidebar name="sidebar-1" />}
      sidebarPosition="right"
    />
  );
}

export function BlogAuthor() {
  const { slug } = useParams();

  const blogAuthorQuery = useBlogListTaxonomy({ taxonomy: 'author', slug: slug ?? '' });

  if (blogAuthorQuery.isPending)
    return (
      <PageSidebarLayoutLoading
        content={
          <>
            <BlogListTaxonomyHeaderLoading />
            <BlogListLoading />
          </>
        }
        sidebarPosition="right"
      />
    );

  if (blogAuthorQuery.isSuccess && !blogAuthorQuery.data) return <Navigate to="/404" replace />;

  if (blogAuthorQuery.isSuccess && blogAuthorQuery.data) {
    const author = blogAuthorQuery.data;

    return (
      <PageSidebarLayout
        content={
          <>
            <BlogListTaxonomyHeader heading={author.name} description={author.description} />
            <BlogList author={author.id} style="wide-small-small" />
          </>
        }
        sidebar={<Sidebar name="sidebar-1" />}
        sidebarPosition="right"
      />
    );
  }
}
