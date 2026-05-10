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

-- post_categories
INSERT INTO public.post_categories (id, name, slug, description, created_at) VALUES
('134368fa-d7f4-4010-9618-d0e8625cf013', 'Travel', 'travel', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('4cf53dbf-5723-43fa-8bc7-6ad39bc0603f', 'Photography', 'photography', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('bfd17149-f16b-4610-bcd1-603b96624f62', 'Lifestyle', 'lifestyle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE);

-- post_tags
INSERT INTO public.post_tags (id, name, slug, description, created_at) VALUES
('1f2ed260-7616-49ee-8d0a-bccc5aa7b254', 'Travel', 'travel', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('6aa1dcbf-5058-4157-b8ec-381dce575e8f', 'Photography', 'photography', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('aba8136e-12ab-42c9-b88b-ea65ff2ad89c', 'Lifestyle', 'lifestyle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE),
('fd46239c-7ef4-4c47-a400-57446fedf3da', 'Outdoors', 'outdoors', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE);

-- post_authors
INSERT INTO public.post_authors (id, name, slug, description, created_at) VALUES
('2ad9506e-0d94-4170-ac6b-399675b3fc7e', 'Lucid Themes', 'lucid-themes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.', CURRENT_DATE);
