import { z } from 'zod';

export const PostOptionsSchema = z.object({
  header: z.object({
    show: z.boolean(),
    layout: z.enum(['outside-above', 'outside-below', 'split-narrow', 'split-wide', 'split-full', 'overlay-narrow', 'overlay-wide', 'overlay-full']),
    besideSidebar: z.boolean(),
  }),
  sidebar: z.object({
    show: z.boolean(),
    option: z.string(),
    position: z.enum(['left', 'right']),
  }),
});

export type PostOptions = z.infer<typeof PostOptionsSchema>;
