


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."instagram_feed_media" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "instagram_feed_id" "uuid" NOT NULL,
    "media_id" "uuid" NOT NULL,
    "position" integer NOT NULL
);


ALTER TABLE "public"."instagram_feed_media" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."instagram_feeds" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "layout" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "button" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."instagram_feeds" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."media" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "text" NOT NULL,
    "storage_path" "text" NOT NULL,
    "alt_text" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "media_type_check" CHECK (("type" = ANY (ARRAY['image'::"text", 'video'::"text"])))
);


ALTER TABLE "public"."media" OWNER TO "postgres";


ALTER TABLE ONLY "public"."instagram_feed_media"
    ADD CONSTRAINT "instagram_feed_media_instagram_feed_id_position_key" UNIQUE ("instagram_feed_id", "position");



ALTER TABLE ONLY "public"."instagram_feed_media"
    ADD CONSTRAINT "instagram_feed_media_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."instagram_feeds"
    ADD CONSTRAINT "instagram_feeds_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."media"
    ADD CONSTRAINT "media_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."media"
    ADD CONSTRAINT "media_storage_path_key" UNIQUE ("storage_path");



ALTER TABLE ONLY "public"."instagram_feed_media"
    ADD CONSTRAINT "instagram_feed_media_instagram_feed_id_fkey" FOREIGN KEY ("instagram_feed_id") REFERENCES "public"."instagram_feeds"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."instagram_feed_media"
    ADD CONSTRAINT "instagram_feed_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE CASCADE;



CREATE POLICY "Enable read access for all users" ON "public"."instagram_feed_media" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."instagram_feeds" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."media" FOR SELECT USING (true);



ALTER TABLE "public"."instagram_feed_media" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."instagram_feeds" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."media" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."instagram_feed_media" TO "anon";
GRANT ALL ON TABLE "public"."instagram_feed_media" TO "authenticated";
GRANT ALL ON TABLE "public"."instagram_feed_media" TO "service_role";



GRANT ALL ON TABLE "public"."instagram_feeds" TO "anon";
GRANT ALL ON TABLE "public"."instagram_feeds" TO "authenticated";
GRANT ALL ON TABLE "public"."instagram_feeds" TO "service_role";



GRANT ALL ON TABLE "public"."media" TO "anon";
GRANT ALL ON TABLE "public"."media" TO "authenticated";
GRANT ALL ON TABLE "public"."media" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































