import PageContent from '@components/UI/PageContent';
import type { Post } from '@typings/posts/post';
import type { Author as AuthorType } from '@typings/posts/author';

import BlogPostNewsletter from './components/newsletter';
import BlogPostTags from './components/tags';
import BlogPostShare from './components/share';
import BlogPostAuthor from './components/author';
import BlogPostNavigation from './components/navigation';
import BlogPostRelated from './components/related';
import BlogPostComments from './components/comments';

export default function BlogPost({ post, author }: { post: Post; author: AuthorType | null }) {
  return (
    <>
      <PageContent content={post.content ?? []} />
      <BlogPostNewsletter />
      <BlogPostTags post={post} />
      <BlogPostShare />
      <BlogPostAuthor author={author} />
      <BlogPostNavigation post={post} />
      <BlogPostRelated post={post} />
      <BlogPostComments post={post} />
    </>
  );
}
