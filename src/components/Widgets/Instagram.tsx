import WidgetTitle from '@components/Widgets/Title';
import InstagramFeed from '@features/instagramFeed';

interface InstagramWidgetProps {
  feedId: string;
  title?: string;
}

export default function InstagramWidget({ feedId, title = '' }: InstagramWidgetProps) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <InstagramFeed feedId={feedId} />
    </section>
  );
}
