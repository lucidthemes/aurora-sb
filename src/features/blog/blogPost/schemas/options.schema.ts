import { z } from 'zod';

export const PostOptionsSchema = z.object({
  header: z.object({
    layout: z.enum(['outside-above', 'outside-below', 'split-narrow', 'split-wide', 'split-full', 'overlay-narrow', 'overlay-wide', 'overlay-full']),
    besideSidebar: z.boolean(),
  }),
  sidebar: z.enum(['left', 'right', 'hidden']),
});

export type PostOptions = z.infer<typeof PostOptionsSchema>;
