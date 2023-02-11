
function comments(db) {
  db.exec(`
  CREATE TABLE IF NOT EXISTS comments
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    rate   INTEGER NOT NULL,
    text   TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);
}

module.exports = { comments };