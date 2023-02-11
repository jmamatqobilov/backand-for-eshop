const { Query } = require('./query');

class LeftJoin extends Query {
  fields;
  joinTable;
  joinCol;
  col;
  constructor(table, fields, joinTable, joinCol, col) {
    super(table);
    this.fields = fields;
    this.joinTable = joinTable;
    this.joinCol = joinCol;
    this.col = col;
    this.LEFT_JOIN = `${this.joinTable} ON ${this.table}.${this.col} = ${this.joinTable}.${this.joinCol}`
  }
  selectFromRight(rightTableColumns) {
    let lsel = this.fields.map(item => `${this.table}.${item}`).join(",");
    let rsel = rightTableColumns ? rightTableColumns.split(",").map(item => `${this.joinTable}.${item}`).join(",") : null;
    this.SELECT = rsel ? `${this.table}.id,${lsel},${rsel}` : `${this.table}.id,${lsel}`;
    return this;
  }
}

module.exports = { LeftJoin };