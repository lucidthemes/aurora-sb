import useBanner from './useBanner';
import BannerLoading from './components/Loading';
import BannerError from './components/Error';
import BannerOverlay from './components/Overlay';
import BannerSplit from './components/Split';

interface BannerProps {
  slug: string;
  layout?: 'overlay' | 'split';
  excerptLength?: number;
}

export default function Banner({ slug, layout = 'overlay', excerptLength = 40 }: BannerProps) {
  const bannerQuery = useBanner(slug);

  if (bannerQuery.isPending) return <BannerLoading />;

  if (bannerQuery.isSuccess && !bannerQuery.data) return <BannerError />;

  const banner = bannerQuery.data;

  return (
    <>
      {banner && layout === 'overlay' && <BannerOverlay banner={banner} excerptLength={excerptLength} />}
      {banner && layout === 'split' && <BannerSplit banner={banner} excerptLength={excerptLength} />}
    </>
  );
}
