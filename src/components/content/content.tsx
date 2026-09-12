import type { ContentBlocks } from '@schemas/contentBlocks.schema';

import { blockRegistry } from './blocks/blocks';

function PageContentBlockRender({ block }: { block: ContentBlocks }) {
  switch (block.type) {
    case 'paragraph': {
      const BlockTemplate = blockRegistry.paragraph.render;

      return <BlockTemplate {...block} />;
    }

    case 'heading': {
      const BlockTemplate = blockRegistry.heading.render;

      return <BlockTemplate {...block} />;
    }

    case 'separator': {
      const BlockTemplate = blockRegistry.separator.render;

      return <BlockTemplate {...block} />;
    }

    case 'list': {
      const BlockTemplate = blockRegistry.list.render;

      return <BlockTemplate {...block} />;
    }

    case 'image': {
      const BlockTemplate = blockRegistry.image.render;

      return <BlockTemplate {...block} />;
    }

    case 'video': {
      const BlockTemplate = blockRegistry.video.render;

      return <BlockTemplate {...block} />;
    }

    case 'quote': {
      const BlockTemplate = blockRegistry.quote.render;

      return <BlockTemplate {...block} />;
    }

    case 'pullquote': {
      const BlockTemplate = blockRegistry.pullquote.render;

      return <BlockTemplate {...block} />;
    }

    case 'mediaText': {
      const BlockTemplate = blockRegistry.mediaText.render;

      return <BlockTemplate {...block} />;
    }

    case 'gallery': {
      const BlockTemplate = blockRegistry.gallery.render;

      return <BlockTemplate {...block} />;
    }

    case 'button': {
      const BlockTemplate = blockRegistry.button.render;

      return <BlockTemplate {...block} />;
    }

    case 'code': {
      const BlockTemplate = blockRegistry.code.render;

      return <BlockTemplate {...block} />;
    }

    default:
      return null;
  }
}

export default function PageContent({ content, fullWidth = false }: { content: ContentBlocks[]; fullWidth?: boolean }) {
  if (!content) return;

  const fullWidthClasses = fullWidth ? 'full-width' : '';

  return (
    <div className={`post-content ${fullWidthClasses}`}>
      {content.map((block) => (
        <PageContentBlockRender key={block.id} block={block} />
      ))}
    </div>
  );
}
