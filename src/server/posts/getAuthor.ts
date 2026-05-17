import { z } from 'zod';

import { AuthorSchema } from '@schemas/posts/author.schema';
import type { Author } from '@typings/posts/author';

export async function getAuthorMap(authorIds: number[]): Promise<Record<number, Author>> {
  try {
    const res = await fetch('/data/post-authors.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-authors.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(AuthorSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${[parsed.error]}`);
    }

    const authors = parsed.data;
    const authorMap: Record<number, Author> = {};

    if (Array.isArray(authors) && Array.isArray(authorIds)) {
      const idSet = new Set(authorIds);
      authors.forEach((author) => {
        if (idSet.has(author.id)) {
          authorMap[author.id] = author;
        }
      });
    }

    return authorMap;
  } catch (error) {
    console.error('getAuthorMap', error);
    throw error;
  }
}
