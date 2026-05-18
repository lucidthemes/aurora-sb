import { useParams, useSearchParams } from 'react-router-dom';

import { PageLayout, PageSidebarLayout, PageSidebarLayoutLoading } from '@components/Layout/PageLayout';
import { Sidebar } from '@components/Layout/Sidebar';
import BlogList from '@features/blog/blogList';
import BlogListLoading from '@features/blog/blogList/components/Loading';
import BlogListTaxonomyHeader from '@features/blog/blogList/components/taxonomy/Header';
import BlogListTaxonomyHeaderLoading from '@features/blog/blogList/components/taxonomy/HeaderLoading';
import BlogListTaxonomyError from '@features/blog/blogList/components/taxonomy/Error';
import useBlogListTaxonomy from '@features/blog/blogList/hooks/useBlogListTaxonomy';
import SearchForm from '@features/searchForm';

export function Blog() {
  const [searchParams] = useSearchParams();
  const layout = searchParams.get('layout') || 'wide-small-small';

  return <PageSidebarLayout content={<BlogList style={layout} />} sidebar={<Sidebar></Sidebar>} sidebarPosition="right" />;
}

export function BlogLeftSidebar() {
  return <PageSidebarLayout content={<BlogList style="wide-small-small" />} sidebar={<Sidebar></Sidebar>} sidebarPosition="left" />;
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

  return (
    <>
      {blogCategoryQuery.isPending && (
        <PageSidebarLayoutLoading
          content={
            <>
              <BlogListTaxonomyHeaderLoading />
              <BlogListLoading />
            </>
          }
          sidebarPosition="right"
        />
      )}
      {blogCategoryQuery.isSuccess && (
        <PageSidebarLayout
          content={
            !blogCategoryQuery.isError && blogCategoryQuery.data ? (
              <>
                <BlogListTaxonomyHeader heading={blogCategoryQuery.data.name} description={blogCategoryQuery.data.description} />
                <BlogList category={blogCategoryQuery.data.id} style="wide-small-small" />
              </>
            ) : (
              <BlogListTaxonomyError taxonomy="Category" />
            )
          }
          sidebar={<Sidebar></Sidebar>}
          sidebarPosition="right"
        />
      )}
    </>
  );
}

export function BlogTag() {
  const { slug } = useParams();

  const blogTagQuery = useBlogListTaxonomy({ taxonomy: 'tag', slug: slug ?? '' });

  return (
    <>
      {blogTagQuery.isPending && (
        <PageSidebarLayoutLoading
          content={
            <>
              <BlogListTaxonomyHeaderLoading />
              <BlogListLoading />
            </>
          }
          sidebarPosition="right"
        />
      )}
      {blogTagQuery.isSuccess && (
        <PageSidebarLayout
          content={
            !blogTagQuery.isError && blogTagQuery.data ? (
              <>
                <BlogListTaxonomyHeader heading={blogTagQuery.data.name} description={blogTagQuery.data.description} />
                <BlogList tag={blogTagQuery.data.id} style="wide-small-small" />
              </>
            ) : (
              <BlogListTaxonomyError taxonomy="Tag" />
            )
          }
          sidebar={<Sidebar></Sidebar>}
          sidebarPosition="right"
        />
      )}
    </>
  );
}

export function BlogSearch() {
  const { term } = useParams();

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
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}

export function BlogAuthor() {
  const { slug } = useParams();

  const blogAuthorQuery = useBlogListTaxonomy({ taxonomy: 'author', slug: slug ?? '' });

  return (
    <>
      {blogAuthorQuery.isPending && (
        <PageSidebarLayoutLoading
          content={
            <>
              <BlogListTaxonomyHeaderLoading />
              <BlogListLoading />
            </>
          }
          sidebarPosition="right"
        />
      )}
      {blogAuthorQuery.isSuccess && (
        <PageSidebarLayout
          content={
            !blogAuthorQuery.isError && blogAuthorQuery.data ? (
              <>
                <BlogListTaxonomyHeader heading={blogAuthorQuery.data.name} description={blogAuthorQuery.data.description} />
                <BlogList author={blogAuthorQuery.data.id} style="wide-small-small" />
              </>
            ) : (
              <BlogListTaxonomyError taxonomy="Author" />
            )
          }
          sidebar={<Sidebar></Sidebar>}
          sidebarPosition="right"
        />
      )}
    </>
  );
}
