import { Link } from 'react-router-dom';

import Button from '@components/UI/Button';

import type { Banner } from '../banner.schema';

export default function BannerContent({ banner, align = 'center' }: { banner: Banner; align?: 'left' | 'center' | 'right' }) {
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
      {banner.excerpt && <p>{banner.excerpt}</p>}
      <Button to={`/blog/${banner.slug}`}>Read more</Button>
    </div>
  );
}
