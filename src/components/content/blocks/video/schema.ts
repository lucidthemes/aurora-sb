import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { ContentBlockInstance } from '../block.schema';

export const VideoBlockAttributesSchema = z.object({
  url: BlockAttributesPlainTextSchema(z.url()),
  size: BlockAttributesPlainTextSchema(z.enum(['original', 'full'])),
  aspect: BlockAttributesPlainTextSchema(z.enum(['original', 'square', 'video', '2-3'])),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const VideoContentBlockSchema = BlockSchema.extend({
  type: z.literal('video'),
  attributes: VideoBlockAttributesSchema.partial().optional(),
});

type VideoContentBlockAttributes = z.infer<typeof VideoBlockAttributesSchema>;

export type VideoContentBlock = ContentBlockInstance<'video', VideoContentBlockAttributes>;
