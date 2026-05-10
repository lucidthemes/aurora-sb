import { useState, useEffect } from 'react';
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
import { getTagBySlug } from '@server/posts/getTag';
import { getAuthorBySlug } from '@server/posts/getAuthor';
import type { Tag } from '@typings/posts/tag';
import type { Author } from '@typings/posts/author';

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
  const [blogTag, setBlogTag] = useState<Tag | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTag = async () => {
      try {
        const tag = await getTagBySlug(slug);
        if (tag) setBlogTag(tag);
      } catch (error) {
        console.error('Failed to fetch tag.', error);
      }
    };

    fetchTag();
  }, [slug]);

  return (
    <PageSidebarLayout
      content={
        blogTag ? (
          <>
            <header className="mb-10 flex flex-col gap-y-5">
              <h1>{blogTag.name}</h1>
              <p>{blogTag.description}</p>
            </header>
            <BlogList tag={blogTag.id} style="wide-small-small" />
          </>
        ) : (
          <p className="rounded-sm bg-white p-5 text-center">Tag not found</p>
        )
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
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
  const [blogAuthor, setBlogAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchAuthor = async () => {
      try {
        const author = await getAuthorBySlug(slug);
        if (author) setBlogAuthor(author);
      } catch (error) {
        console.error('Failed to fetch author.', error);
      }
    };

    fetchAuthor();
  }, [slug]);

  return (
    <PageSidebarLayout
      content={
        blogAuthor ? (
          <>
            <header className="mb-10 flex flex-col gap-y-5">
              <h1>{blogAuthor.name}</h1>
              <p>{blogAuthor.description}</p>
            </header>
            <BlogList author={blogAuthor.id} style="wide-small-small" />
          </>
        ) : (
          <p className="rounded-sm bg-white p-5 text-center">Author not found</p>
        )
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}
