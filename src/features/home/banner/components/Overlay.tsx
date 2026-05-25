import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Banner } from '../banner.schema';
import BannerContent from './Content';

export default function BannerOverlay({ banner, excerptLength }: { banner: Banner; excerptLength?: number }) {
  let mediaUrl = '';

  if (banner.media) mediaUrl = getPublicMediaUrl(banner.media.storage_path);

  return (
    <div className="flex h-125 items-center justify-center rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${mediaUrl})` }}>
      <div className="w-3/4 rounded-sm bg-white p-5 md:w-2/3 md:p-7.5 lg:w-1/2 lg:p-10">
        <BannerContent banner={banner} align="center" excerptLength={excerptLength} />
      </div>
    </div>
  );
}
