import { supabase } from './client';

export const getPublicMediaImageUrl = (path: string) => supabase.storage.from('media/images').getPublicUrl(path).data.publicUrl;
