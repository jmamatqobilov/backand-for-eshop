const { Query } = require('./query');


class All extends Query {
  constructor(table) {
    super(table);
  }
}

module.exports = { All };