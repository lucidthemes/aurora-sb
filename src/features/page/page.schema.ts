import { z } from 'zod';

import { ContentBlocksSchema } from '@schemas/contentBlocks.schema';

export const PageSchema = z.object({
  title: z.string(),
  content: z.array(ContentBlocksSchema).nullable(),
  options: z
    .object({
      sidebar: z.object({
        show: z.boolean(),
        option: z.string().optional(),
        position: z.enum(['left', 'right']).optional(),
      }),
    })
    .optional()
    .nullable(),
});

export type Page = z.infer<typeof PageSchema>;
