import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesBooleanSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { ContentBlockInstance } from '../block.schema';

export const ButtonBlockAttributesSchema = z.object({
  link: BlockAttributesPlainTextSchema(z.string()),
  newTab: BlockAttributesBooleanSchema(z.boolean()),
  text: BlockAttributesPlainTextSchema(z.string()),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const ButtonContentBlockSchema = BlockSchema.extend({
  type: z.literal('button'),
  attributes: ButtonBlockAttributesSchema.partial().optional(),
});

type ButtonContentBlockAttributes = z.infer<typeof ButtonBlockAttributesSchema>;

export type ButtonContentBlock = ContentBlockInstance<'button', ButtonContentBlockAttributes>;
