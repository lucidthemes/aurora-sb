import { z } from 'zod';

export const InstagramFeedSettingsSchema = z.object({
  layout: z.object({
    gap: z.number(),
    aspectRatio: z.string(),
    mobilePosts: z.number().int().positive(),
    tabletPosts: z.number().int().positive(),
    desktopPosts: z.number().int().positive(),
    mobileColumns: z.number().int().positive(),
    tabletColumns: z.number().int().positive(),
    desktopColumns: z.number().int().positive(),
  }),
  button: z.object({
    enabled: z.boolean(),
    link: z.string().optional(),
    text: z.string().optional(),
  }),
});

export type InstagramFeedSettings = z.infer<typeof InstagramFeedSettingsSchema>;

export const InstagramFeedMediaSchema = z.object({
  id: z.string(),
  media: z.object({
    storage_path: z.string(),
    alt_text: z.string().optional(),
  }),
});

export type InstagramFeedMedia = z.infer<typeof InstagramFeedMediaSchema>;
