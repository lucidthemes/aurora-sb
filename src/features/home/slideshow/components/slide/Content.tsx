import { Link } from 'react-router-dom';

import Button from '@components/UI/Button';
import { textTruncateByWords } from '@utils/formatters';

import type { Slideshow } from '../../slideshow.schema';

interface SlideshowSlideContentProps {
  slide: Slideshow;
  button?: boolean;
  align?: 'left' | 'center' | 'right';
  excerptLength?: number;
}

export default function SlideshowSlideContent({ slide, button, align = 'center', excerptLength }: SlideshowSlideContentProps) {
  const contentAlignClass = align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start';
  const textAlignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const buttonAlignClass = align === 'center' ? 'self-center' : align === 'right' ? 'self-end' : 'self-start';

  return (
    <div className={`flex flex-col gap-y-6 ${contentAlignClass} ${textAlignClass}`}>
      <div className="flex flex-col gap-y-4">
        {slide.title && (
          <h2>
            <Link to={`/blog/${slide.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {slide.title}
            </Link>
          </h2>
        )}
        {slide.excerpt && <p>{textTruncateByWords(slide.excerpt, excerptLength ?? 30)}</p>}
        {button && (
          <Button to={`/blog/${slide.slug}`} className={`w-fit ${buttonAlignClass}`}>
            Read more
          </Button>
        )}
      </div>
    </div>
  );
}
