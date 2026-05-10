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

  const blogCategory = useBlogListTaxonomy({ taxonomy: 'category', slug: slug ?? '' });

  return (
    <>
      {blogCategory.isPending && (
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
      {blogCategory.isSuccess && (
        <PageSidebarLayout
          content={
            !blogCategory.isError && blogCategory.data ? (
              <>
                <BlogListTaxonomyHeader heading={blogCategory.data.name} description={blogCategory.data.description} />
                <BlogList category={blogCategory.data.id} style="wide-small-small" />
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

  const blogTag = useBlogListTaxonomy({ taxonomy: 'tag', slug: slug ?? '' });

  return (
    <>
      {blogTag.isPending && (
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
      {blogTag.isSuccess && (
        <PageSidebarLayout
          content={
            !blogTag.isError && blogTag.data ? (
              <>
                <BlogListTaxonomyHeader heading={blogTag.data.name} description={blogTag.data.description} />
                <BlogList tag={blogTag.data.id} style="wide-small-small" />
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

  const blogAuthor = useBlogListTaxonomy({ taxonomy: 'author', slug: slug ?? '' });

  return (
    <>
      {blogAuthor.isPending && (
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
      {blogAuthor.isSuccess && (
        <PageSidebarLayout
          content={
            !blogAuthor.isError && blogAuthor.data ? (
              <>
                <BlogListTaxonomyHeader heading={blogAuthor.data.name} description={blogAuthor.data.description} />
                <BlogList author={blogAuthor.data.id} style="wide-small-small" />
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
