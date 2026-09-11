import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { ContentBlockInstance } from '../block.schema';

export const CodeBlockAttributesSchema = z.object({
  content: BlockAttributesPlainTextSchema(z.string()),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const CodeContentBlockSchema = BlockSchema.extend({
  type: z.literal('code'),
  attributes: CodeBlockAttributesSchema.partial().optional(),
});

type CodeContentBlockAttributes = z.infer<typeof CodeBlockAttributesSchema>;

export type CodeContentBlock = ContentBlockInstance<'code', CodeContentBlockAttributes>;
