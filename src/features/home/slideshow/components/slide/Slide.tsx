import type { Slideshow } from '../../slideshow.schema';
import SlideshowSlideOverlay from './Overlay';
import SlideshowSlideSplit from './Split';

interface SlideshowSlideProps {
  slide: Slideshow;
  button?: boolean;
  layout?: 'overlay-top' | 'overlay-center' | 'overlay-bottom' | 'split';
  align?: 'left' | 'center' | 'right';
  excerptLength?: number;
  multiSlide?: 2 | 3 | 4;
  heightClass?: string;
}

export default function SlideshowSlide({ slide, button, layout, align, excerptLength, multiSlide, heightClass }: SlideshowSlideProps) {
  let slideWidthClasses = 'flex-[0_0_100%]';

  switch (multiSlide) {
    case 2:
      slideWidthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)]';
      break;
    case 3:
      slideWidthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)] xl:flex-[0_0_calc(33.333%-40px)]';
      break;
    case 4:
      slideWidthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)] lg:flex-[0_0_calc(33.333%-40px)] xl:flex-[0_0_calc(25%-40px)]';
      break;
  }

  const slideOverlay = layout?.includes('overlay');
  const slideSplit = layout?.includes('split');

  return (
    <div className={`embla__slide mr-10 min-w-px ${slideWidthClasses}`}>
      {slideOverlay && (
        <SlideshowSlideOverlay slide={slide} button={button} layout={layout} align={align} excerptLength={excerptLength} heightClass={heightClass} />
      )}
      {slideSplit && <SlideshowSlideSplit slide={slide} button={button} align={align} excerptLength={excerptLength} heightClass={heightClass} />}
    </div>
  );
}
