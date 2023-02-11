
function users(db) {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username   VARCHAR(50) NOT NULL,
    email   VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
  );
`);
}

module.exports = { users };