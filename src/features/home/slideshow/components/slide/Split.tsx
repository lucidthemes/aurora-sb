import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Slideshow } from '../../slideshow.schema';
import SlideshowSlideContent from './Content';

interface SlideshowSlideSplitProps {
  slide: Slideshow;
  button?: boolean;
  align?: 'left' | 'center' | 'right';
  excerptLength?: number;
  heightClass?: string;
}

export default function SlideshowSlideSplit({ slide, button, align, excerptLength, heightClass }: SlideshowSlideSplitProps) {
  let mediaUrl = '';

  if (slide.media) mediaUrl = getPublicMediaUrl(slide.media.storage_path);

  return (
    <div className={`flex ${heightClass} flex-col overflow-hidden rounded-md md:flex-row`}>
      <div className="flex basis-1/2 flex-col items-start justify-center bg-white p-5 md:p-7.5 lg:basis-1/3 lg:p-10">
        <SlideshowSlideContent slide={slide} button={button} align={align} excerptLength={excerptLength} />
      </div>
      <div className="min-h-75 basis-1/2 bg-cover bg-center bg-no-repeat md:min-h-auto lg:basis-2/3" style={{ backgroundImage: `url(${mediaUrl})` }}></div>
    </div>
  );
}
