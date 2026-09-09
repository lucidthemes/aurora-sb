import WidgetTitle from '@components/Widgets/Title';
import InstagramFeed from '@features/instagramFeed';

interface InstagramWidgetProps {
  title?: string;
  feedId?: string;
}

export default function InstagramWidget({ title = '', feedId }: InstagramWidgetProps) {
  if (!feedId) return;

  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <InstagramFeed feedId={feedId} />
    </section>
  );
}
