CREATE TABLE logs(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    log_level text NOT NULL CHECK (log_level in ('info', 'warning', 'error', 'critical')),
    event_name text NOT NULL,
    user_id uuid REFERENCES auth.users(id),
    message text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_logs_log_level ON logs(log_level);
CREATE INDEX idx_logs_event_name ON logs(event_name);
CREATE INDEX idx_logs_user_id on logs(user_id);
CREATE INDEX idx_logs_created_at ON logs(created_at DESC);

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;