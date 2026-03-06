import { supabase } from './client';

export const getPublicMediaUrl = (path: string) => supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
