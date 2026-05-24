import { getPublicMediaUrl } from '@lib/supabase/storage';

import type { Slideshow } from '../../slideshow.schema';
import SlideshowSlideContent from './Content';

interface SlideshowSlideOverlayProps {
  slide: Slideshow;
  button?: boolean;
  layout?: 'overlay-top' | 'overlay-center' | 'overlay-bottom' | 'split';
  align?: 'left' | 'center' | 'right';
  excerptLength?: number;
  heightClass?: string;
}

export default function SlideshowSlideOverlay({ slide, button, layout, align, excerptLength, heightClass }: SlideshowSlideOverlayProps) {
  let mediaUrl = '';

  if (slide.media) mediaUrl = getPublicMediaUrl(slide.media.storage_path);

  const overlayAlignClass = layout === 'overlay-top' ? 'items-start' : layout === 'overlay-bottom' ? 'items-end' : 'items-center';
  const overlayWidthClass = layout === 'overlay-center' ? 'max-w-[80%] md:max-w-[60%] lg:max-w-[40%]' : 'w-full';
  const overlayRoundedClass =
    layout === 'overlay-top' ? 'rounded-tr-md rounded-tl-md' : layout === 'overlay-bottom' ? 'rounded-br-md rounded-bl-md' : 'rounded-md';

  return (
    <div
      className={`flex h-100 ${heightClass} ${overlayAlignClass} justify-center rounded-md bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${mediaUrl})` }}
    >
      <div className={`${overlayWidthClass} ${overlayRoundedClass} bg-white p-5 md:p-7.5 lg:p-10`}>
        <SlideshowSlideContent slide={slide} button={button} align={align} excerptLength={excerptLength} />
      </div>
    </div>
  );
}
