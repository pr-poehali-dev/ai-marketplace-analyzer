CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email_or_telegram VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50) DEFAULT 'landing',
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX idx_waitlist_status ON waitlist(status);

COMMENT ON TABLE waitlist IS 'Сбор контактов с лендинга для листа ожидания';
COMMENT ON COLUMN waitlist.email_or_telegram IS 'Email или Telegram username';
COMMENT ON COLUMN waitlist.comment IS 'Комментарий пользователя';
COMMENT ON COLUMN waitlist.source IS 'Откуда пришла заявка: landing, analyzer';
COMMENT ON COLUMN waitlist.status IS 'Статус заявки: pending, contacted, approved';