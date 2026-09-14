import Database from 'better-sqlite3';

const db = new Database('./server/data/welfare.db');

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personnel_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    unit TEXT NOT NULL,
    role TEXT NOT NULL,
    rank_title TEXT,
    security_clearance TEXT,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS wellness_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personnel_id TEXT NOT NULL,
    date TEXT NOT NULL,
    body_weight REAL,
    water_intake REAL,
    meals TEXT,
    sleep_hours REAL,
    sleep_quality TEXT,
    exercise TEXT,
    stress_level INTEGER,
    fatigue_level INTEGER,
    mood TEXT,
    energy_level INTEGER,
    rest_recovery TEXT,
    notes TEXT,
    ai_risk TEXT,
    ai_confidence REAL,
    human_verification TEXT DEFAULT 'Pending',
    notification_status TEXT DEFAULT 'Not Sent',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ai_conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personnel_id TEXT NOT NULL,
    role TEXT NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;