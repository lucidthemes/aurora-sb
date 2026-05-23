interface SlideshowLoadingProps {
  height?: 'standard' | 'tall';
  multiSlide?: 2 | 3 | 4;
  navPosition?: 'inside' | 'outside';
}

export default function SlideshowLoading({ height, multiSlide, navPosition }: SlideshowLoadingProps) {
  const heightClass = height === 'standard' ? 'h-125' : height === 'tall' ? 'h-150' : 'h-125';
  const multiSlideClass = multiSlide ? '-mr-10' : '';

  let widthClasses = 'flex-[0_0_100%]';

  switch (multiSlide) {
    case 2:
      widthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)]';
      break;
    case 3:
      widthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)] xl:flex-[0_0_calc(33.333%-40px)]';
      break;
    case 4:
      widthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)] lg:flex-[0_0_calc(33.333%-40px)] xl:flex-[0_0_calc(25%-40px)]';
      break;
  }

  return (
    <div className="relative">
      {navPosition === 'outside' && (
        <div className={`static left-0 h-full w-full md:absolute md:top-0 md:bottom-0 ${heightClass}`}>
          <div className="absolute bottom-15 left-2 z-2 h-11 w-11 animate-pulse rounded-full bg-white md:top-1/2 md:-left-16 md:-translate-y-1/2"></div>
          <div className="absolute right-2 bottom-15 z-2 h-11 w-11 animate-pulse rounded-full bg-white md:top-1/2 md:-right-16 md:-translate-y-1/2"></div>
        </div>
      )}
      <div className={`flex ${multiSlideClass}`}>
        <div className={`mr-10 min-w-px animate-pulse rounded-md bg-white ${widthClasses} ${heightClass}`}></div>
        {multiSlide && multiSlide >= 2 && (
          <div className={`mr-10 hidden min-w-px animate-pulse rounded-md bg-white md:block ${widthClasses} ${heightClass}`}></div>
        )}
        {multiSlide && multiSlide >= 3 && (
          <div className={`mr-10 hidden min-w-px animate-pulse rounded-md bg-white xl:block ${widthClasses} ${heightClass}`}></div>
        )}
        {multiSlide && multiSlide === 4 && (
          <div className={`mr-10 hidden min-w-px animate-pulse rounded-md bg-white xl:block ${widthClasses} ${heightClass}`}></div>
        )}
      </div>
      <div className="mt-10 flex h-3 w-31 animate-pulse justify-self-center rounded-md bg-white"></div>
    </div>
  );
}
