import Container from '@components/Layout/Container';

import type { Post } from '../../schemas/post.schema';

import BlogPostHeaderContent from './components/Content';
import BlogPostHeaderOutsideLayout from './components/OutsideLayout';
import BlogPostHeaderOverlayLayout from './components/OverlayLayout';
import BlogPostHeaderSplitLayout from './components/SplitLayout';

export default function BlogPostHeader({ post }: { post: Post }) {
  if (!post) return null;

  const layout = post.options?.header.layout ?? 'outside-below';
  const besideSidebar = post.options?.header.besideSidebar ?? true;

  let headerLayout = '';
  let headerLayoutWidth = '';
  let headerLayoutAlign = '';
  let headerCustomPadding = '';

  if (layout.includes('outside')) {
    headerLayout = 'outside';
    headerLayoutAlign = 'center';
  } else if (layout.includes('overlay')) {
    headerLayout = 'overlay';
    headerLayoutAlign = 'center';
  } else if (layout.includes('split')) {
    headerLayout = 'split';
    headerLayoutAlign = 'left';
  }

  if (layout.includes('wide')) {
    headerLayoutWidth = 'wide';
  } else if (layout.includes('full')) {
    headerLayoutWidth = 'full';
    headerCustomPadding = 'p-0';
  }

  const headerContent = <BlogPostHeaderContent post={post} align={headerLayoutAlign} />;

  const HeaderLayoutComponent = {
    outside: BlogPostHeaderOutsideLayout,
    overlay: BlogPostHeaderOverlayLayout,
    split: BlogPostHeaderSplitLayout,
  }[headerLayout];

  if (!HeaderLayoutComponent) {
    return null;
  }

  const headerInner = <HeaderLayoutComponent post={post} content={headerContent} layout={layout} />;

  return (
    <header>
      {!besideSidebar ? (
        <Container width={headerLayoutWidth} customPadding={headerCustomPadding}>
          {headerInner}
        </Container>
      ) : (
        headerInner
      )}
    </header>
  );
}
