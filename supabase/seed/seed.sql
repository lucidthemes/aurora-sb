-- media - instagram feed images
INSERT INTO public.media (id, type, storage_path, alt_text, created_at) VALUES 
('5e793f0c-4f67-4661-ac27-95f86af5247d','image', 'images/instagram-1.jpg', 'Instagram 1', CURRENT_DATE),
('65a55d48-b1e8-456f-b92a-33d22e64fae0', 'image', 'images/instagram-2.jpg', 'Instagram 2', CURRENT_DATE),
('d0d8efc2-c11f-4ecc-94a3-d870e606c1f6', 'image', 'images/instagram-3.jpg', 'Instagram 3', CURRENT_DATE),
('009c6f80-a77e-4be6-9203-8d2908bb2b18', 'image', 'images/instagram-4.jpg', 'Instagram 4', CURRENT_DATE),
('5c145a39-ce40-43b9-ad66-0ee1927e4b03', 'image', 'images/instagram-5.jpg', 'Instagram 5', CURRENT_DATE),
('5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d', 'image', 'images/instagram-6.jpg', 'Instagram 6', CURRENT_DATE),
('3cdbeb91-56d3-4edb-809e-15f746c85fa1', 'image', 'images/instagram-7.jpg', 'Instagram 7', CURRENT_DATE),
('84df9dcd-325c-4507-914b-575aaccfd2e4', 'image', 'images/instagram-8.jpg', 'Instagram 8', CURRENT_DATE),
('aba12b37-d555-4383-9db1-fbec6ae13a1d', 'image', 'images/instagram-9.jpg', 'Instagram 9', CURRENT_DATE);

-- instagram_feeds
INSERT INTO public.instagram_feeds (id, name, layout, button, created_at) VALUES
('491b660b-3ed1-4281-b53b-b93d06231205', 'Footer', '{"gap": 4, "aspectRatio": "square", "mobilePosts": 1, "tabletPosts": 4, "desktopPosts": 6, "mobileColumns": 1, "tabletColumns": 4, "desktopColumns": 6}'::jsonb, '{"link": "https://aurora-sb.vercel.app/", "text": "Follow on Instagram", "enabled": true}'::jsonb, CURRENT_DATE),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', 'Sidebar', '{"gap": 2.5, "aspectRatio": "square", "mobilePosts": 1, "tabletPosts": 3, "desktopPosts": 9, "mobileColumns": 1, "tabletColumns": 1, "desktopColumns": 3}'::jsonb, '{"enabled": false}'::jsonb, CURRENT_DATE);

-- instagram_feed_media - footer
INSERT INTO public.instagram_feed_media (instagram_feed_id, media_id, position) VALUES
('491b660b-3ed1-4281-b53b-b93d06231205', '5e793f0c-4f67-4661-ac27-95f86af5247d', 1),
('491b660b-3ed1-4281-b53b-b93d06231205', '65a55d48-b1e8-456f-b92a-33d22e64fae0', 2),
('491b660b-3ed1-4281-b53b-b93d06231205', 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6', 3),
('491b660b-3ed1-4281-b53b-b93d06231205', '009c6f80-a77e-4be6-9203-8d2908bb2b18', 4),
('491b660b-3ed1-4281-b53b-b93d06231205', '5c145a39-ce40-43b9-ad66-0ee1927e4b03', 5),
('491b660b-3ed1-4281-b53b-b93d06231205', '5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d', 6);

-- instagram_feed_media - sidebar
INSERT INTO public.instagram_feed_media (instagram_feed_id, media_id, position) VALUES
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '5e793f0c-4f67-4661-ac27-95f86af5247d', 1),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '65a55d48-b1e8-456f-b92a-33d22e64fae0', 2),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6', 3),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '009c6f80-a77e-4be6-9203-8d2908bb2b18', 4),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '5c145a39-ce40-43b9-ad66-0ee1927e4b03', 5),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d', 6),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '3cdbeb91-56d3-4edb-809e-15f746c85fa1', 7),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '84df9dcd-325c-4507-914b-575aaccfd2e4', 8),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', 'aba12b37-d555-4383-9db1-fbec6ae13a1d', 9);

-- pages
INSERT INTO public.pages (id, title, slug, content, status, created_at, updated_at, options) VALUES 
('1e8eec3b-e186-41f9-b82d-11e011ea9b9e', 'About', 'about-right', null, 'published', '2026-05-28 11:09:58.06074+00', '2026-05-28 11:09:58.06074+00', '{"sidebar": {"show": true, "option": "sidebar-1", "position": "right"}}'), 
('3005233b-6366-416e-aa6e-269a31348288', 'Contact', 'contact-left', null, 'published', '2026-05-28 11:19:20.340775+00', '2026-05-28 11:19:20.340775+00', '{"sidebar": {"show": true, "option": "sidebar-1", "position": "left"}}'), 
('56cb89b8-ab2c-4286-ab2e-83f07b3e0050', 'About', 'about-left', null, 'published', '2026-05-28 11:10:08.794001+00', '2026-05-28 11:10:08.794001+00', '{"sidebar": {"show": true, "option": "sidebar-1", "position": "left"}}'), 
('7f64412e-20d9-47a5-ad59-98a8e421aaad', 'Contact', 'contact', null, 'published', '2026-05-28 11:13:45.550422+00', '2026-05-28 11:13:45.550422+00', '{"sidebar": {"show": false}}'), 
('8a9b16ee-6e48-4168-94ac-7bb8849c187a', 'About', 'about', null, 'published', '2026-05-28 09:48:04.250153+00', '2026-05-28 09:48:04.250153+00', '{"sidebar": {"show": false}}'), 
('dfc79d6a-6a4a-4599-b714-cf2a5b856b0f', 'Contact', 'contact-right', null, 'published', '2026-05-28 11:19:10.172172+00', '2026-05-28 11:19:10.172172+00', '{"sidebar": {"show": true, "option": "sidebar-1", "position": "right"}}');

-- post_authors
INSERT INTO public.post_authors (id, name, slug, description, created_at) VALUES
('2ad9506e-0d94-4170-ac6b-399675b3fc7e', 'Lucid Themes', 'lucid-themes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE);

-- post_categories
INSERT INTO public.post_categories (id, name, slug, description, created_at) VALUES
('134368fa-d7f4-4010-9618-d0e8625cf013', 'Travel', 'travel', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('4cf53dbf-5723-43fa-8bc7-6ad39bc0603f', 'Photography', 'photography', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('87154118-0f2c-4ecb-8aac-d30db2f84531', 'Fashion', 'fashion', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('bfd17149-f16b-4610-bcd1-603b96624f62', 'Lifestyle', 'lifestyle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE);

-- post_tags
INSERT INTO public.post_tags (id, name, slug, description, created_at) VALUES
('1f2ed260-7616-49ee-8d0a-bccc5aa7b254', 'Travel', 'travel', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('6aa1dcbf-5058-4157-b8ec-381dce575e8f', 'Photography', 'photography', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('aba8136e-12ab-42c9-b88b-ea65ff2ad89c', 'Lifestyle', 'lifestyle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('fd46239c-7ef4-4c47-a400-57446fedf3da', 'Outdoors', 'outdoors', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE);

-- posts
INSERT INTO public.posts (id, title, slug, author_id, media_id, excerpt, content, status, created_at, updated_at, options) VALUES 
('d5d045dc-6542-4dcd-8bd7-5b5ebb490c4f', 'Dune walk', 'dune-walk', '2ad9506e-0d94-4170-ac6b-399675b3fc7e', '5e793f0c-4f67-4661-ac27-95f86af5247d', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id', null, 'published', '2026-05-11 11:00:00+00', '2026-05-11 11:48:39.870294+00', '{"header": {"show": true, "layout": "outside-above", "besideSidebar": false}, "sidebar": {"show": true, "option": "sidebar-1", "position": "right"}}'), 
('bfb70be6-1225-4ac5-b738-f4e72192132c', 'Old Town Centre', 'old-town-centre', '2ad9506e-0d94-4170-ac6b-399675b3fc7e', '65a55d48-b1e8-456f-b92a-33d22e64fae0', null, null, 'published', '2026-05-11 10:00:00+00', '2026-05-11 09:42:39+00', '{"header": {"show": true, "layout": "outside-below", "besideSidebar": true}, "sidebar": {"show": true, "option": "sidebar-1", "position": "right"}}'), 
('42335c3a-d1bf-458b-8039-f23aca8f825b', 'Beach Adventure', 'beach-adventure', '2ad9506e-0d94-4170-ac6b-399675b3fc7e', '5e793f0c-4f67-4661-ac27-95f86af5247d', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id', null, 'published', '2026-05-11 09:00:00+00', '2026-05-14 14:40:20.695056+00', '{"header": {"show": true, "layout": "split-wide", "besideSidebar": false}, "sidebar": {"show": true, "option": "sidebar-1", "position": "right"}}');

-- posts_categories
INSERT INTO public.posts_categories (id, category_id, post_id) VALUES 
('4d3a876f-69ef-4fd5-8935-ec8554b639e2', '87154118-0f2c-4ecb-8aac-d30db2f84531', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f'), 
('5ac2df90-327d-45e3-9011-23b6636c6cf0', '134368fa-d7f4-4010-9618-d0e8625cf013', '42335c3a-d1bf-458b-8039-f23aca8f825b'), 
('87eb8bee-539f-4908-a54d-2b28fa1e2dc8', '134368fa-d7f4-4010-9618-d0e8625cf013', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f'),
('ce5174c6-49c9-4f50-bf67-d919a14177e0', '4cf53dbf-5723-43fa-8bc7-6ad39bc0603f', 'bfb70be6-1225-4ac5-b738-f4e72192132c');

-- posts_comments
INSERT INTO public.posts_comments (id, post_id, reply_to, name, comment, status, created_at) VALUES 
('21d9e560-d6f6-47f9-be49-e29f0612ce8c', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f', 'c1eea15a-eb0d-4651-a03d-5c5e452a1017', 'Lucid Themes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.', 'approved', '2026-05-13 14:55:32.005976+00'), 
('238c6654-0e03-475a-b67a-0edeb7d7086f', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f', '21d9e560-d6f6-47f9-be49-e29f0612ce8c', 'Lucid Themes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.', 'approved', '2026-05-14 12:04:28.128639+00'), 
('c1eea15a-eb0d-4651-a03d-5c5e452a1017', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f', null, 'Lucid Themes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.', 'approved', '2026-05-12 10:39:52.005286+00'),
('dd4775f1-aafb-4fe2-8e59-dfd7d92abe0c', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f', null, 'Lucid Themes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.', 'pending', '2026-05-13 14:22:52.292918+00');

-- posts_related_posts
INSERT INTO public.posts_related_posts (id, related_post_id, post_id) VALUES 
('c7c38358-bd93-420f-8c74-51efe8338a8c', 'bfb70be6-1225-4ac5-b738-f4e72192132c', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f');

-- posts_tags
INSERT INTO public.posts_tags (id, tag_id, post_id) VALUES 
('36320d7f-3b47-4b61-83a8-69a730aaaebc', 'fd46239c-7ef4-4c47-a400-57446fedf3da', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f'),
('6c5c2fc4-7bff-4db5-bcad-69db5ee5dcf3', '1f2ed260-7616-49ee-8d0a-bccc5aa7b254', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f'),
('85c9975a-c92d-4b4c-99fd-2149347b3d9e', 'aba8136e-12ab-42c9-b88b-ea65ff2ad89c', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f'), 
('92077e0d-018f-47c7-b2c8-2e95d8a3f319', '6aa1dcbf-5058-4157-b8ec-381dce575e8f', 'd5d045dc-6542-4dcd-8bd7-5b5ebb490c4f');

-- sidebars
INSERT INTO public.sidebars (id, name, title, widgets, created_at) VALUES 
('0cf28167-80a7-4415-a475-fe2a0094ff5d', 'sidebar-3', 'Sidebar 3', '[{"id": "6aa1dcbf-5058-4157-b8ec-381dce575e8f", "type": "posts", "limit": 3, "order": 1, "style": "wide", "title": "Latest posts", "location": "sidebar"}, {"id": "c1eea15a-eb0d-4651-a03d-5c5e452a1017", "type": "search", "order": 2, "title": "Search"}, {"id": "92077e0d-018f-47c7-b2c8-2e95d8a3f319", "type": "tags", "order": 3, "title": "Tags"}]', '2026-05-27 11:36:59.36085+00'), 
('3618d033-8032-4e0f-9a60-88861fc95480', 'footer-3', 'Footer 3', '[{"id": "f9ef04be-5f07-415d-87bf-25f03e0d64d8", "type": "products", "limit": 2, "order": 1, "style": "small", "title": "Latest products", "location": "footer"}]', '2026-05-27 11:42:35.862441+00'), 
('7543a3c0-b1df-49ae-a032-9cd3a5828451', 'sidebar-1', 'Sidebar 1', '[{"id": "92077e0d-018f-47c7-b2c8-2e95d8a3f319", "type": "tags", "order": 8, "title": "Tags"}, {"id": "85c9975a-c92d-4b4c-99fd-2149347b3d9e", "type": "newsletter", "order": 5, "title": "Newsletter"}, {"id": "c1eea15a-eb0d-4651-a03d-5c5e452a1017", "type": "search", "order": 7, "title": "Search"}, {"id": "2ad9506e-0d94-4170-ac6b-399675b3fc7e", "type": "social", "order": 4, "title": "Follow me"}, {"id": "18524a6b-477e-482b-b278-d9f3666ac66c", "type": "instagram", "order": 3, "title": "Instagram", "feedId": "6a0b506f-1717-434c-8333-f7f4e8f5bb1b"}, {"id": "6aa1dcbf-5058-4157-b8ec-381dce575e8f", "type": "posts", "limit": 2, "order": 2, "style": "wide", "title": "Latest posts", "location": "sidebar"}, {"id": "eccc782f-2088-4ca5-9c06-b145dd9bfa5c", "link": "/category/lifestyle", "type": "promoBox", "image": "images/instagram-1.jpg", "order": 6, "title": "Promo box", "heading": "Lifestyle", "position": "center"}, {"id": "a67f566e-34c4-4e17-9860-b27b1e085ad7", "link": "/contact", "type": "about", "order": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu", "heading": "Lucid Themes", "authorImage": "images/instagram-2.jpg", "backgroundImage": "images/instagram-1.jpg"}]', '2026-05-26 11:23:29.220644+00'),
('77d78c5a-a70e-4c73-ba41-380ad98b7804', 'footer-2', 'Footer 2', '[{"id": "6aa1dcbf-5058-4157-b8ec-381dce575e8f", "type": "posts", "limit": 3, "order": 1, "style": "small", "title": "Latest posts", "location": "footer"}]', '2026-05-27 11:41:28.101062+00'), 
('99f31358-854a-472e-8170-cf487aa95be5', 'footer-1', 'Footer 1', '[{"id": "a67f566e-34c4-4e17-9860-b27b1e085ad7", "type": "about", "order": 1, "title": "About me", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut.", "padding": false, "centered": false}]', '2026-05-27 11:39:35.528294+00'), 
('a907bbdc-8c9c-4f2d-9f95-54036557605d', 'sidebar-2', 'Sidebar 2', '[{"id": "a67f566e-34c4-4e17-9860-b27b1e085ad7", "link": "/contact", "type": "about", "order": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu", "heading": "Lucid Themes", "authorImage": "images/instagram-2.jpg", "backgroundImage": "images/instagram-1.jpg"}, {"id": "18524a6b-477e-482b-b278-d9f3666ac66c", "type": "instagram", "order": 2, "title": "Instagram", "feedId": "6a0b506f-1717-434c-8333-f7f4e8f5bb1b"}, {"id": "eccc782f-2088-4ca5-9c06-b145dd9bfa5c", "link": "/category/lifestyle", "type": "promoBox", "image": "images/instagram-1.jpg", "order": 3, "heading": "Lifestyle", "position": "center"}, {"id": "eccc782f-2088-4ca5-9c06-b145dd9bfa5c", "link": "/category/travel", "type": "promoBox", "image": "images/instagram-1.jpg", "order": 4, "heading": "Travel", "position": "center"}, {"id": "eccc782f-2088-4ca5-9c06-b145dd9bfa5c", "link": "/category/photography", "type": "promoBox", "image": "images/instagram-1.jpg", "order": 5, "heading": "Photography", "position": "center"}, {"id": "85c9975a-c92d-4b4c-99fd-2149347b3d9e", "type": "newsletter", "order": 6, "title": "Newsletter"}]', '2026-05-27 11:34:01.131597+00');