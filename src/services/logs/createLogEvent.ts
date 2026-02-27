import { supabase } from '@lib/supabase/client';

export async function createLogEvent(logLevel: 'info' | 'warning' | 'error' | 'critical', eventName: string, message?: string, userId?: string) {
  const { error } = await supabase.functions.invoke('log-event', {
    body: {
      log_level: logLevel,
      event_name: eventName,
      message,
      user_id: userId,
      source: 'frontend',
    },
  });

  if (error) {
    console.error('Log event failed:', error.message);
  }
}
