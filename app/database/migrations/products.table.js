

function products(db) {
  db.exec(`
  CREATE TABLE IF NOT EXISTS products
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title   VARCHAR(50) NOT NULL,
    image   TEXT NOT NULL,
    text TEXT NOT NULL
  );
`);
}

module.exports = { products };