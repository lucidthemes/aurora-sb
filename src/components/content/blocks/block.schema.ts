import type { ComponentType } from 'react';
import { z } from 'zod';

import type { ParagraphContentBlock } from './paragraph/schema';
import type { HeadingContentBlock } from './heading/schema';
import type { SeparatorContentBlock } from './separator/schema';
import type { ListContentBlock } from './list/schema';
import type { ImageContentBlock } from './image/schema';
import type { VideoContentBlock } from './video/schema';
import type { QuoteContentBlock } from './quote/schema';
import type { PullquoteContentBlock } from './pullquote/schema';
import type { MediaTextContentBlock } from './media-text/schema';
import type { GalleryContentBlock } from './gallery/schema';
import type { ButtonContentBlock } from './button/schema';
import type { CodeContentBlock } from './code/schema';

// Block types

const BlockTypesSchema = z.enum([
  'paragraph',
  'heading',
  'separator',
  'list',
  'image',
  'video',
  'quote',
  'pullquote',
  'mediaText',
  'gallery',
  'button',
  'code',
]);

type BlockTypes = z.infer<typeof BlockTypesSchema>;

// Block attributes

export const BlockAttributesPlainTextSchema = <T extends z.ZodType<string>>(valueSchema: T) =>
  z.object({
    type: z.literal('plain-text'),
    value: valueSchema.optional(),
  });

export const BlockAttributesRichTextSchema = <T extends z.ZodType<string>>(valueSchema: T) =>
  z.object({
    type: z.literal('rich-text'),
    value: valueSchema.optional(),
  });

export const BlockAttributesNumberSchema = <T extends z.ZodType<number>>(valueSchema: T) =>
  z.object({
    type: z.literal('number'),
    value: valueSchema.optional(),
  });

export const BlockAttributesBooleanSchema = <T extends z.ZodType<boolean>>(valueSchema: T) =>
  z.object({
    type: z.literal('boolean'),
    value: valueSchema.optional(),
  });

export const BlockAttributesArraySchema = <T extends z.ZodType<object>>(arraySchema: T) =>
  z.object({
    type: z.literal('array'),
    items: z.array(arraySchema).optional(),
  });

// Block supports

export const BlockSupportsWidthSchema = z.enum(['standard', 'wide', 'full']);

export const BlockSupportsAlignSchema = z.enum(['left', 'center', 'right']);

// Content blocks

export const BlockSchema = z.object({
  id: z.uuid(),
});

export type ContentBlockInstance<TBlockType extends BlockTypes, TContentBlockAttributes> = {
  id: string;
  type: TBlockType;
  attributes?: Partial<TContentBlockAttributes>;
};

// Block registry

type BlockRegistryRenderMap = {
  paragraph: ComponentType<ParagraphContentBlock>;
  heading: ComponentType<HeadingContentBlock>;
  separator: ComponentType<SeparatorContentBlock>;
  list: ComponentType<ListContentBlock>;
  image: ComponentType<ImageContentBlock>;
  video: ComponentType<VideoContentBlock>;
  quote: ComponentType<QuoteContentBlock>;
  pullquote: ComponentType<PullquoteContentBlock>;
  mediaText: ComponentType<MediaTextContentBlock>;
  gallery: ComponentType<GalleryContentBlock>;
  button: ComponentType<ButtonContentBlock>;
  code: ComponentType<CodeContentBlock>;
};

export type BlockRegistry = {
  [K in BlockTypes]: {
    render: BlockRegistryRenderMap[K];
  };
};
