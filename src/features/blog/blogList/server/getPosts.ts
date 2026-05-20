import { z } from 'zod';

import { supabase } from '@lib/supabase/client';
import { createLogEvent } from '@lib/supabase/logEvent';

import { PostsSchema } from '../schemas/posts.schema';
import type { Posts } from '../schemas/posts.schema';

export async function getPosts({
  limit,
  category,
  tag,
  author,
  search,
  showPagination,
  postsPerPage,
  blogListPage,
}: {
  limit?: number;
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  showPagination?: boolean;
  postsPerPage?: number;
  blogListPage?: number;
}): Promise<{ posts: Posts[]; postsCount: number | null } | null> {
  let taxonomyId = '';

  // fetch taxonomy (category or tag) id from the passed through slug
  if (category || tag) {
    const table = category ? 'post_categories' : tag ? 'post_tags' : '';

    const { data: taxonomyData, error: taxonomyError } = await supabase.from(table).select('id').eq('slug', category).maybeSingle();

    if (taxonomyError) {
      await createLogEvent('error', 'FETCH_BLOG_LIST_POSTS_TAXONOMY_FAILED', taxonomyError.message);

      return null;
    }

    if (taxonomyData?.id) taxonomyId = taxonomyData?.id;
  }

  // conditional filters for taxonomies (category and tag) so that filter can be applied
  // whilst also returning all categories or tags for each post
  const categoryFilter = category
    ? `filter_categories:posts_categories!inner (
          category_id
        )`
    : `filter_categories:posts_categories (
          category_id
        )`;

  const tagsFilter = tag
    ? `filter_tags:posts_tags!inner (
          tag_id
        )`
    : `filter_tags:posts_tags (
          tag_id
        )`;

  // main posts query
  let query = supabase
    .from('posts')
    .select(
      `
        id,
        title,
        slug,
        author:author_id (
          id,
          name,
          slug,
          description
        ),
        media:media_id (
          storage_path,
          alt_text
        ),
        ${categoryFilter},
        categories:posts_categories (
          category:post_categories (
            id,
            name,
            slug
          )
        ),
        ${tagsFilter},
        tags:posts_tags (
          tag:post_tags (
            id,
            name,
            slug
          )
        ),
        excerpt,
        status,
        created_at,
        updated_at
    `,
      { count: 'exact' }
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  if (category && taxonomyId) query = query.eq('filter_categories.category_id', taxonomyId);

  if (tag && taxonomyId) query = query.eq('filter_tags.tag_id', taxonomyId);

  if (author) query = query.eq('author.id', author);

  if (search) query = query.ilike('title', '%' + search + '%');

  if (showPagination) {
    const rangeFrom = (Number(blogListPage) - 1) * Number(postsPerPage);
    const rangeTo = Number(rangeFrom) + Number(postsPerPage) - 1;

    query = query.range(rangeFrom, rangeTo);
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_BLOG_LIST_POSTS_FAILED', error.message);

    return null;
  }

  const normalized = data.map((postData) => {
    const normalizedPost = {
      ...postData,
      categories: postData.categories.map((c) => c.category) ?? null,
      tags: postData.tags.map((t) => t.tag) ?? null,
    };

    return normalizedPost;
  });

  const parsed = z.array(PostsSchema).safeParse(normalized);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_BLOG_LIST_POSTS_INVALID_DATA', 'Fetch blog list posts failed schema validation');

    return null;
  }

  return { posts: parsed.data, postsCount: count };
}
