import SlideshowNavigationPrevious from './Previous';
import SlideshowNavigationNext from './Next';

interface SlideshowNavigationProps {
  scrollPrev: () => void | undefined;
  scrollNext: () => void | undefined;
  navPosition?: 'inside' | 'outside';
  heightClass?: string;
}

export default function SlideshowNavigation({ scrollPrev, scrollNext, navPosition, heightClass }: SlideshowNavigationProps) {
  return (
    <div className={`embla-navigation static left-0 h-full w-full md:absolute md:top-0 md:bottom-0 ${heightClass}`}>
      <SlideshowNavigationPrevious scrollPrev={scrollPrev} navPosition={navPosition} />
      <SlideshowNavigationNext scrollNext={scrollNext} navPosition={navPosition} />
    </div>
  );
}
