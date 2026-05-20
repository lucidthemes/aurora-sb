import { useState, useRef } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getPosts } from '../server/getPosts';

interface UseBlogListParams {
  limit?: number;
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  showPagination?: boolean;
  postsPerPage?: number;
}

export default function useBlogList({ limit, category, tag, author, search, showPagination, postsPerPage }: UseBlogListParams) {
  const blogListRef = useRef<HTMLUListElement | null>(null);

  const [blogListPage, setBlogListPage] = useState(1);

  const handleBlogListPageChange = (pageNumber: number) => {
    setBlogListPage(pageNumber);
    blogListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const blogListQuery = useQuery({
    queryKey: ['blogList', limit, category, tag, author, search, showPagination, postsPerPage, blogListPage],
    queryFn: () => getPosts({ limit, category, tag, author, search, showPagination, postsPerPage, blogListPage }),
    placeholderData: keepPreviousData,
  });

  return { blogListQuery, blogListRef, blogListPage, handleBlogListPageChange };
}
