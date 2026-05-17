import { z } from 'zod';

export const NavigationSchema = z.object({
  title: z.string(),
  slug: z.string(),
});

export type Navigation = z.infer<typeof NavigationSchema>;
