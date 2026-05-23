import useBanner from './useBanner';
import BannerLoading from './components/Loading';
import BannerError from './components/Error';
import BannerOverlay from './components/Overlay';
import BannerSplit from './components/Split';

export default function Banner({ slug, layout = 'overlay' }: { slug: string; layout?: 'overlay' | 'split' }) {
  const bannerQuery = useBanner(slug);

  if (bannerQuery.isPending) return <BannerLoading />;

  if (bannerQuery.isSuccess && !bannerQuery.data) return <BannerError />;

  const banner = bannerQuery.data;

  return (
    <>
      {banner && layout === 'overlay' && <BannerOverlay banner={banner} />}
      {banner && layout === 'split' && <BannerSplit banner={banner} />}
    </>
  );
}
