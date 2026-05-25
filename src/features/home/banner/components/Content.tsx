import { Link } from 'react-router-dom';

import Button from '@components/UI/Button';
import { textTruncateByWords } from '@utils/formatters';

import type { Banner } from '../banner.schema';

interface BannerContentProps {
  banner: Banner;
  align?: 'left' | 'center' | 'right';
  excerptLength?: number;
}

export default function BannerContent({ banner, align = 'center', excerptLength }: BannerContentProps) {
  const alignClass = align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';

  return (
    <div className={`flex flex-col items-${alignClass} gap-y-4 text-${align}`}>
      {banner.title && (
        <h2>
          <Link to={`/blog/${banner.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            {banner.title}
          </Link>
        </h2>
      )}
      {banner.excerpt && <p>{textTruncateByWords(banner.excerpt, excerptLength ?? 30)}</p>}
      <Button to={`/blog/${banner.slug}`}>Read more</Button>
    </div>
  );
}
