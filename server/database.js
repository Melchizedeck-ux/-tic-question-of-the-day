const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'tic_app.db'));
db.pragma('foreign_keys = ON');

const initDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_text TEXT NOT NULL,
      category TEXT DEFAULT 'General',
      active_date DATE UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      answer_text TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
      UNIQUE(user_id, question_id)
    );
  `);

  const count = db.prepare('SELECT COUNT(*) as count FROM questions').get();
  if (count.count === 0) {
    const today = new Date().toISOString().split('T')[0];
    db.prepare(`
      INSERT INTO questions (question_text, category, active_date)
      VALUES (?, ?, ?)
    `).run('What core programming concept challenged you most this week?', 'Tech', today);
  }

  console.log('✅ SQLite database schema initialized successfully.');
};

initDB();

module.exports = db;