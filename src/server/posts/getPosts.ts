import { z } from 'zod';

import { PostsSchema } from '@schemas/posts/posts.schema';
import type { Posts } from '@schemas/posts/posts.schema';

export async function getPosts(limit?: number, category?: number, tag?: number, author?: number, search?: string): Promise<Posts[]> {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(PostsSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    let posts = parsed.data;

    if (limit && limit > 0) {
      posts = posts.slice(0, limit);
    }

    if (category) {
      posts = posts.filter((post) => post.categories?.includes(category));
    }

    if (tag) {
      posts = posts.filter((post) => post.tags?.includes(tag));
    }

    if (author) {
      posts = posts.filter((post) => post.authorId === author);
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      posts = posts.filter((post) => post.title.toLowerCase().includes(lowerSearch));
    }

    return posts;
  } catch (error) {
    console.error('getPosts', error);
    throw error;
  }
}
