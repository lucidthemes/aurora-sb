import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Banner } from '../banner.schema';
import BannerContent from './Content';

export default function BannerSplit({ banner }: { banner: Banner }) {
  let mediaUrl = '';

  if (banner.media) mediaUrl = getPublicMediaUrl(banner.media.storage_path);

  return (
    <div className="flex h-125 overflow-hidden rounded-md">
      <div className="flex basis-1/3 flex-col items-start justify-center bg-white p-5 md:p-7.5 lg:p-10">
        <BannerContent banner={banner} align="left" />
      </div>
      <div className="basis-2/3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${mediaUrl})` }}></div>
    </div>
  );
}
