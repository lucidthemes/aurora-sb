import WidgetTitle from '@components/Widgets/Title';
import PromoBox from '@features/home/promoBox';
import { getPublicMediaUrl } from '@lib/supabase/storage';

interface PromoBoxWidgetProps {
  title?: string;
  image?: string;
  heading?: string;
  subHeading?: string;
  link?: string;
  position?: 'bottom' | 'top' | 'center';
}

export default function PromoBoxWidget({ title = '', image, heading, subHeading, link, position = 'bottom' }: PromoBoxWidgetProps) {
  let mediaUrl = '';

  if (image) mediaUrl = getPublicMediaUrl(image);

  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <PromoBox image={mediaUrl} heading={heading} headingLevel="4" subHeading={subHeading} link={link} position={position} />
    </section>
  );
}
