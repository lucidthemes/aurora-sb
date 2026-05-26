import {
  AboutWidget,
  InstagramWidget,
  NewsletterWidget,
  PostsWidget,
  ProductsWidget,
  PromoBoxWidget,
  SearchWidget,
  SocialWidget,
  TagsWidget,
} from '@components/Widgets';

import type { Widgets } from '../schemas/widgets/widgets.schema';

function renderWidget(widget: Widgets) {
  switch (widget.type) {
    case 'about':
      return (
        <AboutWidget
          key={widget.id}
          title={widget.title}
          backgroundImage={widget.backgroundImage}
          authorImage={widget.authorImage}
          heading={widget.heading}
          content={widget.content}
          link={widget.link}
          social={widget.social}
          centered={widget.centered}
          padding={widget.padding}
        />
      );
    case 'instagram':
      return <InstagramWidget key={widget.id} title={widget.title} feedId={widget.feedId} />;
    case 'newsletter':
      return <NewsletterWidget key={widget.id} title={widget.title} />;
    case 'posts':
      return <PostsWidget key={widget.id} title={widget.title} limit={widget.limit} style={widget.style} location={widget.location} />;
    case 'products':
      return <ProductsWidget key={widget.id} title={widget.title} limit={widget.limit} style={widget.style} location={widget.location} />;
    case 'promoBox':
      return (
        <PromoBoxWidget
          key={widget.id}
          title={widget.title}
          image={widget.image}
          heading={widget.heading}
          subHeading={widget.subHeading}
          link={widget.link}
          position={widget.position}
        />
      );
    case 'search':
      return <SearchWidget key={widget.id} title={widget.title} />;
    case 'social':
      return <SocialWidget key={widget.id} title={widget.title} />;
    case 'tags':
      return <TagsWidget key={widget.id} title={widget.title} limit={widget.limit} />;
  }
}

export default function SidebarWidgets({ widgets }: { widgets: Widgets[] | null }) {
  if (!widgets) return <p>No widgets found</p>;

  const sortedWidgets = widgets.sort((a, b) => a.order - b.order);

  const renderedWidgets = sortedWidgets.map((widget) => renderWidget(widget));

  if (renderedWidgets) return renderedWidgets;
}
