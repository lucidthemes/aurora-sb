import BlogListPaginationPrevious from './Previous';
import BlogListPaginationNumbers from './Numbers';
import BlogListPaginationNext from './Next';

interface BlogListPaginationProps {
  postsCount?: number | null;
  postsPerPage: number;
  blogListPage: number;
  handleBlogListPageChange: (pageNumber: number) => void;
}

export default function BlogListPagination({ postsCount, postsPerPage, blogListPage, handleBlogListPageChange }: BlogListPaginationProps) {
  if (!postsCount) return null;

  const totalPages = Math.ceil(postsCount / postsPerPage);

  return (
    <nav aria-label="Post pagination">
      <ul className="mt-10 flex justify-center gap-x-4">
        {blogListPage !== 1 && <BlogListPaginationPrevious blogListPage={blogListPage} handleBlogListPageChange={handleBlogListPageChange} />}
        <BlogListPaginationNumbers totalPages={totalPages} blogListPage={blogListPage} handleBlogListPageChange={handleBlogListPageChange} />
        {blogListPage !== totalPages && <BlogListPaginationNext blogListPage={blogListPage} handleBlogListPageChange={handleBlogListPageChange} />}
      </ul>
    </nav>
  );
}
