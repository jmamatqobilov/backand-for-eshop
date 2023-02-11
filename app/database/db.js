const sqlite3 = require("sqlite3").verbose();
const { users } = require("./migrations/users.table");
const { products } = require("./migrations/products.table");
const { comments } = require("./migrations/comments.table");

function connect() {
  const db = new sqlite3.Database("./app.db", (error) => {
    if (error) {
      return console.error(error.message);
    }
    users(db);
    products(db);
    comments(db);
  });
  return db;
}


module.exports = connect();