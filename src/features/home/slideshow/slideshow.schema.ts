import { z } from 'zod';

export const SlideshowSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
  media: z
    .object({
      storage_path: z.string(),
    })
    .nullable(),
  excerpt: z.string().nullable(),
});

export type Slideshow = z.infer<typeof SlideshowSchema>;
