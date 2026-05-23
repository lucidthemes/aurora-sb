import { z } from 'zod';

export const BannerSchema = z.object({
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

export type Banner = z.infer<typeof BannerSchema>;
