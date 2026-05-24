import SlideshowDotsDot from './Dot';

interface SlideshowDotsProps {
  scrollSnaps: number[];
  selectedIndex: number;
  scrollTo: (index: number) => void | undefined;
}

export default function SlideshowDots({ scrollSnaps, selectedIndex, scrollTo }: SlideshowDotsProps) {
  return (
    <div className="embla__dots mt-10 flex items-center justify-center gap-x-4">
      {scrollSnaps.map((_, index) => (
        <SlideshowDotsDot key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
      ))}
    </div>
  );
}
