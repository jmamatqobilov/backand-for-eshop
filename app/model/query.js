const database = require('../database/db');

class Query {
  db;
  table;
  SELECT;
  ORDER_BY;
  GROUP_BY;
  WHERE;
  LEFT_JOIN;
  params;
  constructor(table) {
    this.db = database;
    this.table = table;
    this.SELECT = "*";
  }

  sql() {
    return 'SELECT ' + this.SELECT + ' FROM ' + this.table + ' '
      + (this.LEFT_JOIN ? 'LEFT JOIN ' + this.LEFT_JOIN : '') + ' '
      + (this.GROUP_BY ? 'GROUP BY ' + this.GROUP_BY : '') + ' '
      + (this.WHERE ? 'WHERE ' + this.WHERE : '') + ' '
      + (this.ORDER_BY ? 'ORDER BY ' + this.ORDER_BY : '');
  }

  orderBy(col, down) {
    this.ORDER_BY = `${col} ${down ? 'DESC' : 'ASC'}`;
    return this;
  }

  where(col, op, val) {
    this.WHERE = `${col} ${op} ${val}`;
    return this;
  }

  select(columns) {
    this.SELECT = columns;
    return this;
  }

  groupBy(col, selects) {
    for (let key in selects) {
      if (key === "count") {
        this.SELECT += `,COUNT(${selects[key]}) AS ${key}`;
      } else if (key === "avg") {
        this.SELECT += `,ROUND(AVG(${selects[key]})) AS ${key}`;
      } else {  
        this.SELECT += selects[key];
      }
    }
    this.GROUP_BY = col;
    return this;
  }

  async avg(column, round) {
    this.SELECT = `ROUND(AVG(${column}), ${round ? round : 0}) AS avg`;
    const avg = await this.get();
    return avg[0]['avg'];
  }

  async count() {
    this.SELECT = `COUNT(*) AS count`;
    const count = await this.get();
    return count[0]['count'];
  }

  async get() {
    return new Promise((resolve, reject) => {
      // return resolve(this.sql());
      if (this.params) {
        this.db.all(this.sql(), this.params,
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              resolve(rows);
            }
          })
      } else {
        this.db.all(this.sql(),
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              resolve(rows);
            }
          })
      }
    })
  }
}

module.exports = { Query };