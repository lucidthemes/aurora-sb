-- media - instagram feed images
INSERT INTO "public"."media" (id, type, storage_path, alt_text, created_at) VALUES 
('5e793f0c-4f67-4661-ac27-95f86af5247d','image', 'instagram-1.jpg', 'Instagram 1', CURRENT_DATE),
('65a55d48-b1e8-456f-b92a-33d22e64fae0', 'image', 'instagram-2.jpg', 'Instagram 2', CURRENT_DATE),
('d0d8efc2-c11f-4ecc-94a3-d870e606c1f6', 'image', 'instagram-3.jpg', 'Instagram 3', CURRENT_DATE),
('009c6f80-a77e-4be6-9203-8d2908bb2b18', 'image', 'instagram-4.jpg', 'Instagram 4', CURRENT_DATE),
('5c145a39-ce40-43b9-ad66-0ee1927e4b03', 'image', 'instagram-5.jpg', 'Instagram 5', CURRENT_DATE),
('5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d', 'image', 'instagram-6.jpg', 'Instagram 6', CURRENT_DATE),
('3cdbeb91-56d3-4edb-809e-15f746c85fa1', 'image', 'instagram-7.jpg', 'Instagram 7', CURRENT_DATE),
('84df9dcd-325c-4507-914b-575aaccfd2e4', 'image', 'instagram-8.jpg', 'Instagram 8', CURRENT_DATE),
('aba12b37-d555-4383-9db1-fbec6ae13a1d', 'image', 'instagram-9.jpg', 'Instagram 9', CURRENT_DATE);

-- instagram feeds
INSERT INTO "public"."instagram_feeds" (id, name, layout, button, created_at) VALUES
('491b660b-3ed1-4281-b53b-b93d06231205', 'Footer', '{"gap": 4, "aspectRatio": "square", "mobilePosts": 1, "tabletPosts": 4, "desktopPosts": 6, "mobileColumns": 1, "tabletColumns": 4, "desktopColumns": 6}'::jsonb, '{"link": "https://aurora-sb.vercel.app/", "text": "Follow on Instagram", "enabled": true}'::jsonb, CURRENT_DATE),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', 'Sidebar', '{"gap": 2.5, "aspectRatio": "square", "mobilePosts": 1, "tabletPosts": 3, "desktopPosts": 9, "mobileColumns": 1, "tabletColumns": 1, "desktopColumns": 3}'::jsonb, '{"enabled": false}'::jsonb, CURRENT_DATE);

-- instagram feed media - footer
INSERT INTO "public"."instagram_feed_media" (instagram_feed_id, media_id, position) VALUES
('491b660b-3ed1-4281-b53b-b93d06231205', '5e793f0c-4f67-4661-ac27-95f86af5247d', 1),
('491b660b-3ed1-4281-b53b-b93d06231205', '65a55d48-b1e8-456f-b92a-33d22e64fae0', 2),
('491b660b-3ed1-4281-b53b-b93d06231205', 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6', 3),
('491b660b-3ed1-4281-b53b-b93d06231205', '009c6f80-a77e-4be6-9203-8d2908bb2b18', 4),
('491b660b-3ed1-4281-b53b-b93d06231205', '5c145a39-ce40-43b9-ad66-0ee1927e4b03', 5),
('491b660b-3ed1-4281-b53b-b93d06231205', '5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d', 6);

-- instagram feed media - sidebar
INSERT INTO "public"."instagram_feed_media" (instagram_feed_id, media_id, position) VALUES
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '5e793f0c-4f67-4661-ac27-95f86af5247d', 1),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '65a55d48-b1e8-456f-b92a-33d22e64fae0', 2),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6', 3),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '009c6f80-a77e-4be6-9203-8d2908bb2b18', 4),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '5c145a39-ce40-43b9-ad66-0ee1927e4b03', 5),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d', 6),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '3cdbeb91-56d3-4edb-809e-15f746c85fa1', 7),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', '84df9dcd-325c-4507-914b-575aaccfd2e4', 8),
('6a0b506f-1717-434c-8333-f7f4e8f5bb1b', 'aba12b37-d555-4383-9db1-fbec6ae13a1d', 9);