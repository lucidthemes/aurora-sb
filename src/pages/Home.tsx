import Container from '@components/Layout/Container';
import { PageSidebarLayout } from '@components/Layout/PageLayout';
import { Sidebar, Sidebar2, Sidebar3 } from '@components/Layout/Sidebar';
import SectionHeading from '@components/UI/SectionHeading';
import Slideshow from '@features/home/slideshow';
import Banner from '@features/home/banner';
import PromoBox from '@features/home/promoBox';
import Newsletter from '@features/home/newsletter';
import BlogList from '@features/blog/blogList';

export function Home() {
  return (
    <>
      <section aria-label="Featured slideshow">
        <Container width="wide">
          <Slideshow limit={5} height="standard" layout="split" align="left" loop={true} autoplay={false} navPosition="outside" />
        </Container>
      </section>

      <section aria-label="Category promo boxes">
        <Container>
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
            <PromoBox
              image="/images/posts/post-8.jpg"
              heading="Lifestyle"
              subHeading="Lorem ipsum dolor sit amet"
              link="/category/lifestyle"
              position="bottom"
            />
            <PromoBox image="/images/posts/post-2.jpg" heading="Travel" subHeading="Lorem ipsum dolor sit amet" link="/category/travel" position="bottom" />
            <PromoBox
              image="/images/posts/post-12.jpg"
              heading="Photography"
              subHeading="Lorem ipsum dolor sit amet"
              link="/category/photography"
              position="bottom"
            />
          </div>
        </Container>
      </section>

      <section aria-label="Join my newsletter">
        <Container>
          <Newsletter />
        </Container>
      </section>

      <section aria-label="Latest blog posts">
        <PageSidebarLayout content={<BlogList style="wide-small-small" />} sidebar={<Sidebar />} sidebarPosition="right" />
      </section>
    </>
  );
}

export function HomeClassic() {
  return (
    <>
      <section aria-label="Featured slideshow">
        <Container width="full" customPadding="p-0">
          <Slideshow limit={5} height="tall" button={false} loop={true} autoplay={false} navPosition="inside" />
        </Container>
      </section>

      <section aria-label="Category promo boxes">
        <Container>
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
            <PromoBox image="/images/posts/post-8.jpg" heading="Lifestyle" link="/category/lifestyle" position="center" />
            <PromoBox image="/images/posts/post-2.jpg" heading="Travel" link="/category/travel" position="center" />
            <PromoBox image="/images/posts/post-12.jpg" heading="Photography" link="/category/photography" position="center" />
          </div>
        </Container>
      </section>

      <section aria-label="Join my newsletter">
        <Container>
          <Newsletter />
        </Container>
      </section>

      <section aria-label="Latest blog posts">
        <PageSidebarLayout content={<BlogList style="wide-small-half" />} sidebar={<Sidebar />} sidebarPosition="right" />
      </section>
    </>
  );
}

export function HomeMagazine() {
  return (
    <>
      <section aria-label="Latest blog posts">
        <PageSidebarLayout content={<BlogList style="wide-small-small" postsPerPage={3} />} sidebar={<Sidebar2 />} sidebarPosition="right" />
      </section>

      <section className="bg-spring-wood py-10" aria-label="Lifestyle post slideshow">
        <Container width="wide">
          <SectionHeading heading="Lifestyle" align="center" link="/category/lifestyle" />
          <Slideshow
            limit={5}
            height="tall"
            layout="overlay-bottom"
            button={false}
            excerptLength={10}
            loop={true}
            autoplay={true}
            navPosition="outside"
            multiSlide={3}
          />
        </Container>
      </section>

      <section aria-label="Latest travel posts">
        <PageSidebarLayout
          content={
            <>
              <SectionHeading heading="Travel" link="/category/travel" />
              <BlogList limit={3} category="travel" style="wide-grid-2" showPagination={false} />
            </>
          }
          sidebar={<Sidebar3 />}
          sidebarPosition="right"
        />
      </section>

      <section className="bg-spring-wood py-10" aria-label="Featured post">
        <Container width="wide">
          <SectionHeading heading="Featured" align="center" />
          <Banner slug="boho-fashion" layout="overlay" />
        </Container>
      </section>

      <section aria-label="Latest photography posts">
        <Container>
          <SectionHeading heading="Photography" link="/category/photography" linkButton="View more" />
          <BlogList limit={3} category="photography" style="grid-3" showPagination={false} />
        </Container>
      </section>
    </>
  );
}

export function HomeMinimal() {
  return (
    <section aria-label="Latest blog posts">
      <Container>
        <BlogList style="grid-2" postsPerPage={8} />
      </Container>
    </section>
  );
}
