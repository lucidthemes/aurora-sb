import useSlideshow from './hooks/useSlideshow';
import useCarousel from './hooks/useCarousel';
import SlideshowLoading from './components/Loading';
import SlideshowError from './components/Error';
import SlideshowNavigation from './components/navigation';
import SlideshowSlide from './components/slide/Slide';
import SlideshowDots from './components/dots';

interface SlideshowProps {
  limit?: number;
  category?: string;
  height?: 'standard' | 'tall';
  button?: boolean;
  layout?: 'overlay-top' | 'overlay-center' | 'overlay-bottom' | 'split';
  align?: 'left' | 'center' | 'right';
  excerptLength?: number;
  loop?: boolean;
  autoplay?: boolean;
  multiSlide?: 2 | 3 | 4;
  navPosition?: 'inside' | 'outside';
}

export default function Slideshow({
  limit = 5,
  category,
  height = 'standard',
  button = true,
  layout = 'overlay-center',
  align = 'center',
  excerptLength = 30,
  loop = true,
  autoplay = false,
  multiSlide,
  navPosition = 'outside',
}: SlideshowProps) {
  const slideshowQuery = useSlideshow({ limit, category });

  const { emblaRef, scrollSnaps, selectedIndex, scrollPrev, scrollNext, scrollTo } = useCarousel(loop, autoplay);

  if (slideshowQuery.isPending) return <SlideshowLoading height={height} multiSlide={multiSlide} navPosition={navPosition} />;

  if (slideshowQuery.isSuccess && (!slideshowQuery.data || slideshowQuery.data.length === 0)) return <SlideshowError />;

  const slides = slideshowQuery.data;

  const heightClass = height === 'standard' ? 'md:h-125' : height === 'tall' ? 'md:h-150' : 'md:h-125';
  const multiSlideClass = multiSlide ? '-mr-10' : '';

  return (
    <>
      {slideshowQuery.isSuccess && slides && slides.length > 0 && (
        <div className="embla-carousel relative" aria-label="Carousel">
          <SlideshowNavigation scrollPrev={scrollPrev} scrollNext={scrollNext} navPosition={navPosition} heightClass={heightClass} />
          <div className="embla overflow-hidden rounded-md" ref={emblaRef}>
            <div className={`embla__container ${multiSlideClass} flex ${heightClass}`}>
              {slides.map((slide) => (
                <SlideshowSlide
                  key={slide.id}
                  slide={slide}
                  button={button}
                  layout={layout}
                  align={align}
                  excerptLength={excerptLength}
                  multiSlide={multiSlide}
                  heightClass={heightClass}
                />
              ))}
            </div>
          </div>
          <SlideshowDots scrollSnaps={scrollSnaps} selectedIndex={selectedIndex} scrollTo={scrollTo} />
        </div>
      )}
    </>
  );
}
