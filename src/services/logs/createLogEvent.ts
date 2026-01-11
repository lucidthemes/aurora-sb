export async function createLogEvent(logLevel: 'info' | 'warning' | 'error' | 'critical', eventName: string, message?: string) {
  const payload = { log_level: logLevel, event_name: eventName, message };

  await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
