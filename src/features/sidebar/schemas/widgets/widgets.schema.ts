import { z } from 'zod';

import { AboutWidgetSchema } from './about.schema';
import { InstagramWidgetSchema } from './instagram.schema';
import { NewsletterWidgetSchema } from './newsletter.schema';
import { PostsWidgetSchema } from './posts.schema';
import { ProductsWidgetSchema } from './products.schema';
import { PromoBoxWidgetSchema } from './promoBox.schema';
import { SearchWidgetSchema } from './search.schema';
import { SocialWidgetSchema } from './social.schema';
import { TagsWidgetSchema } from './tags.schema';

export const WidgetsSchema = z.discriminatedUnion('type', [
  AboutWidgetSchema,
  InstagramWidgetSchema,
  NewsletterWidgetSchema,
  PostsWidgetSchema,
  ProductsWidgetSchema,
  PromoBoxWidgetSchema,
  SearchWidgetSchema,
  SocialWidgetSchema,
  TagsWidgetSchema,
]);

export type Widgets = z.infer<typeof WidgetsSchema>;
