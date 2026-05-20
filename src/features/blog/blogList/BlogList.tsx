import useBlogList from './hooks/useBlogList';
import BlogListLoading from './components/Loading';
import BlogListError from './components/Error';
import BlogListItemWide from './components/Item/WideLayout';
import BlogListItemSmall from './components/Item/SmallLayout';
import BlogListPagination from './components/pagination/Pagination';

interface BlogListProps {
  limit?: number;
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  style?: string;
  showPagination?: boolean;
  postsPerPage?: number;
}

export default function BlogList({ limit, category, tag, author, search = '', style = 'wide', showPagination = true, postsPerPage = 6 }: BlogListProps) {
  const { blogListQuery, blogListRef, blogListPage, handleBlogListPageChange } = useBlogList({
    limit,
    category,
    tag,
    author,
    search,
    showPagination,
    postsPerPage,
  });

  if (blogListQuery.isPending) return <BlogListLoading style={style} />;

  if (blogListQuery.isSuccess && (!blogListQuery.data || blogListQuery.data?.posts.length === 0)) return <BlogListError />;

  const posts = blogListQuery.data?.posts;

  const postsCount = blogListQuery.data?.postsCount;

  const wide = style === 'wide';
  const wideSmall = style === 'wide-small-small' || style === 'wide-small-half' || style === 'wide-small-large';
  const wideGrid = style === 'wide-grid-2' || style === 'wide-grid-3' || style === 'wide-grid-4';
  const grid = style === 'grid-2' || style === 'grid-3' || style === 'grid-4';
  //const small = style === 'small-small' || style === 'small-half' || style === 'small-large';

  const wideExcerpt = 70;
  const smallExcerpt = 45;
  const gridExcerpt = 25;

  let listClasses = 'grid gap-10';
  let mediaClasses = '';
  let contentClasses = 'p-5 md:p-7.5';

  if (!wideGrid && !grid) {
    listClasses += ' grid-cols-1';
    contentClasses += ' lg:p-10';
    if (style.includes('small-small')) {
      mediaClasses += ' lg:basis-[40%]';
      contentClasses += ' lg:basis-[60%]';
    } else if (style.includes('small-half')) {
      mediaClasses += ' lg:basis-1/2';
      contentClasses += ' lg:basis-1/2';
    } else if (style.includes('small-large')) {
      mediaClasses += ' lg:basis-[60%]';
      contentClasses += ' lg:basis-[40%]';
    }
  } else {
    if (style.includes('grid-2')) {
      listClasses += ' grid-cols-1 lg:grid-cols-2';
      contentClasses += ' lg:p-10';
    }
    if (style.includes('grid-3')) {
      listClasses += ' grid-cols-1 lg:grid-cols-3';
    }
    if (style.includes('grid-4')) {
      listClasses += ' grid-cols-1 lg:grid-cols-4';
      contentClasses += ' lg:p-5';
    }
  }

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 && (
        <>
          <ul className={listClasses} aria-label="Blog posts" ref={blogListRef}>
            {posts.map((post, index) => {
              const isFirstPost = index === 0 && blogListPage === 1;
              const itemWide = wide || grid || wideGrid || (wideSmall && isFirstPost);
              const itemWideGridClasses = wideGrid && isFirstPost ? 'col-span-full' : '';
              const itemWideExcerptLength =
                wide || (wideSmall && isFirstPost) ? wideExcerpt : grid ? gridExcerpt : wideGrid && !isFirstPost ? gridExcerpt : wideExcerpt;

              return (
                <li key={post.id} className={itemWideGridClasses}>
                  {itemWide ? (
                    <BlogListItemWide post={post} excerptLength={itemWideExcerptLength} mediaClasses={mediaClasses} contentClasses={contentClasses} />
                  ) : (
                    <BlogListItemSmall post={post} excerptLength={smallExcerpt} mediaClasses={mediaClasses} contentClasses={contentClasses} />
                  )}
                </li>
              );
            })}
          </ul>
          {showPagination && (
            <BlogListPagination
              postsCount={postsCount}
              postsPerPage={postsPerPage}
              blogListPage={blogListPage}
              handleBlogListPageChange={handleBlogListPageChange}
            />
          )}
        </>
      )}
    </>
  );
}
