import { z } from 'zod';

import { ParagraphContentBlockSchema } from '@components/content/blocks/paragraph/schema';
import { HeadingContentBlockSchema } from '@components/content/blocks/heading/schema';
import { SeparatorContentBlockSchema } from '@components/content/blocks/separator/schema';
import { ListContentBlockSchema } from '@components/content/blocks/list/schema';
import { ImageContentBlockSchema } from '@components/content/blocks/image/schema';
import { VideoContentBlockSchema } from '@components/content/blocks/video/schema';
import { QuoteContentBlockSchema } from '@components/content/blocks/quote/schema';
import { PullquoteContentBlockSchema } from '@components/content/blocks/pullquote/schema';
import { MediaTextContentBlockSchema } from '@components/content/blocks/media-text/schema';
import { GalleryContentBlockSchema } from '@components/content/blocks/gallery/schema';
import { ButtonContentBlockSchema } from '@components/content/blocks/button/schema';
import { CodeContentBlockSchema } from '@components/content/blocks/code/schema';

export const ContentBlocksSchema = z.discriminatedUnion('type', [
  ParagraphContentBlockSchema,
  HeadingContentBlockSchema,
  SeparatorContentBlockSchema,
  ListContentBlockSchema,
  ImageContentBlockSchema,
  VideoContentBlockSchema,
  QuoteContentBlockSchema,
  PullquoteContentBlockSchema,
  MediaTextContentBlockSchema,
  GalleryContentBlockSchema,
  ButtonContentBlockSchema,
  CodeContentBlockSchema,
]);

export type ContentBlocks = z.infer<typeof ContentBlocksSchema>;
