import { Navigate } from 'react-router-dom';

import { PageLayout, PageSidebarLayout, PageSidebarLayoutLoading } from '@components/Layout/PageLayout';
import PageTitle from '@components/UI/PageTitle';
import PageContent from '@components/UI/PageContent';
import ContactForm from '@features/contactForm';
import useSinglePage from '@features/page/useSinglePage';
import SinglePageLoading from '@features/page/Loading';
import Sidebar from '@features/sidebar';

export default function SinglePage({ slug }: { slug: string }) {
  const singlePageQuery = useSinglePage(slug);

  if (singlePageQuery.isPending) return <PageSidebarLayoutLoading content={<SinglePageLoading />} />;

  if (singlePageQuery.isSuccess && !singlePageQuery.data) return <Navigate to="/404" replace />;

  if (singlePageQuery.isSuccess && singlePageQuery.data) {
    const page = singlePageQuery.data;

    const pageOptions = page?.options;
    const pageSidebarShow = pageOptions?.sidebar.show ?? true;
    const pageSidebarOption = pageOptions?.sidebar.option ?? 'sidebar-1';
    const pageSidebarPosition = pageOptions?.sidebar.position ?? 'right';

    return (
      <>
        {!pageSidebarShow && (
          <PageLayout>
            {page.title && <PageTitle>{page.title}</PageTitle>}
            {page.content && <PageContent content={page.content} />}
            {page.title.toLowerCase().includes('contact') && <ContactForm />}
          </PageLayout>
        )}
        {pageSidebarShow && (
          <PageSidebarLayout
            content={
              <>
                {page.title && <PageTitle>{page.title}</PageTitle>}
                {page.content && <PageContent content={page.content} />}
                {page.title.toLowerCase().includes('contact') && <ContactForm />}
              </>
            }
            sidebar={<Sidebar name={pageSidebarOption} />}
            sidebarPosition={pageSidebarPosition}
          />
        )}
      </>
    );
  }
}
