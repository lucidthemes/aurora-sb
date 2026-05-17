import PageContent from '@components/UI/PageContent';

import type { Post } from './schemas/post.schema';
import BlogPostNewsletter from './components/newsletter';
import BlogPostTags from './components/tags';
import BlogPostShare from './components/share';
import BlogPostAuthor from './components/author';
import BlogPostNavigation from './components/navigation';
import BlogPostRelated from './components/related';
import BlogPostComments from './components/comments';

export default function BlogPost({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <>
      <PageContent content={post.content ?? []} />
      <BlogPostNewsletter />
      <BlogPostTags tags={post.tags} />
      <BlogPostShare />
      <BlogPostAuthor author={post.author} />
      <BlogPostNavigation postId={post.id} createdDate={post.created_at} />
      <BlogPostRelated related={post.related} />
      <BlogPostComments postId={post.id} comments={post.comments} />
    </>
  );
}
