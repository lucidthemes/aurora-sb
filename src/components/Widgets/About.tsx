import { Link } from 'react-router-dom';

import WidgetTitle from '@components/Widgets/Title';
import SocialIcons from '@components/UI/SocialIcons';
import { getPublicMediaUrl } from '@lib/supabase/storage';

interface AboutWidgetProps {
  title?: string;
  backgroundImage?: string;
  authorImage?: string;
  heading?: string;
  content?: string;
  link?: string;
  social?: boolean;
  centered?: boolean;
  padding?: boolean;
}

export default function AboutWidget({
  title = '',
  backgroundImage = '',
  authorImage = '',
  heading = '',
  content = '',
  link = '',
  social = true,
  centered = true,
  padding = true,
}: AboutWidgetProps) {
  let backgroundMediaUrl = '';
  let authorMediaUrl = '';

  if (backgroundImage) backgroundMediaUrl = getPublicMediaUrl(backgroundImage);
  if (authorImage) authorMediaUrl = getPublicMediaUrl(authorImage);

  return (
    <section className={`about-widget ${centered ? 'text-center' : ''} ${padding ? 'rounded-md bg-pampas p-5' : ''} `}>
      <WidgetTitle>{title}</WidgetTitle>
      {backgroundMediaUrl && <img src={backgroundMediaUrl} alt={heading} className="rounded-md" />}
      {authorMediaUrl && (
        <Link
          to={link}
          className="relative mx-auto mt-[-75px] mb-5 block h-35 w-35 overflow-hidden rounded-full border-4 border-white bg-cover bg-center transition-colors duration-300 ease-in-out hover:border-pearl-bush focus:border-pearl-bush"
        >
          <img src={authorMediaUrl} alt={heading} className="h-full w-full" />
        </Link>
      )}
      <div className="flex flex-col gap-y-5">
        {heading && (
          <h4>
            <Link to={link} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {heading}
            </Link>
          </h4>
        )}
        {content && <p>{content}</p>}
        {social && <SocialIcons centered={centered} />}
      </div>
    </section>
  );
}
