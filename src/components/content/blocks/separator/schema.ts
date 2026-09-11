import { z } from 'zod';

import { BlockAttributesPlainTextSchema, BlockSupportsWidthSchema, BlockSchema } from '../block.schema';
import type { ContentBlockInstance } from '../block.schema';

export const SeparatorAttributesSchema = z.object({
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const SeparatorContentBlockSchema = BlockSchema.extend({
  type: z.literal('separator'),
  attributes: SeparatorAttributesSchema.partial().optional(),
});

type SeparatorContentBlockAttributes = z.infer<typeof SeparatorAttributesSchema>;

export type SeparatorContentBlock = ContentBlockInstance<'separator', SeparatorContentBlockAttributes>;
