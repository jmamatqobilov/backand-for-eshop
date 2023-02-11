const database = require('../database/db');
const { All } = require('./all');
const { LeftJoin } = require("./join");

class Model {
  static db = database;
  static fields;
  static table;
  static hidden;

  constructor(data, hidden) {
    for (let key in data) {
      if (hidden && hidden.includes(key)) {
        continue;
      }
      this[key] = data[key];
    }
  }

  static async findBy(find) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM ${this.table} WHERE ${Object
        .keys(find)
        .map((k, i) => i === 0 ? k + " = ?" : " AND " + k + " = ?")
        .join("")}`,
        Object.values(find),
        (error, row) => {
          if (error) {
            reject(error)
          } else {
            resolve(row && new Model(row, this.hidden));
          }
        })
    })
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM ${this.table} WHERE email = ?`,
        email,
        (error, row) => {
          if (error) {
            reject(error)
          } else {
            resolve(row && new Model(row));
          }
        })
    })
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM ${this.table} WHERE id = ?`,
        id,
        (error, row) => {
          if (error) {
            reject(error)
          } else {
            resolve(row && new Model(row, this.hidden));
          }
        })
    })
  }

  static async hasMany({ rel, column, id }) {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM ${rel} WHERE ${column} = ?`,
        id,
        (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows);
          }
        })
    })
  }

  static leftJoin(joinTable, joinCol, col) {
    return new LeftJoin(this.table, this.fields, joinTable, joinCol, col);
  }

  static all() {
    return new All(this.table);
  }

  static async save(data) {
    return new Promise((resolve, reject) => {
      Object.keys(data).forEach(val => {
        if (!this.fields.includes(val)) {
          return reject(new Error("Fields must be compotable of model fields"))
        }
      })
      this.db.run(`INSERT INTO ${this.table} (${Object.keys(data).map((key, i) => i === 0 ? key : ", " + key).join("")}) VALUES (${Object.keys(data).map((_, i) => i === 0 ? "?" : ", ?").join("")})`,
        Object.values(data), (error) => {
          if (error) {
            return reject(error);
          }
        })
      this.db.all(`SELECT * FROM ${this.table}`,
        (error, rows) => {
          if (error) {
            return reject(error)
          } else {
            const id = rows[rows.length - 1]['id']
            this.db.get(`SELECT * FROM ${this.table} WHERE id = ?`, id, (error, row) => {
              if (error) {
                return reject(error)
              } else {
                resolve(row && new Model(row, this.hidden));
              }
            })
          }
        })
    })
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      Object.keys(data).forEach(val => {
        if (!this.fields.includes(val)) {
          return reject(new Error("Fields must be compotable of model fields"))
        }
      })
      this.db.run(`UPDATE ${this.table} set ${Object.keys(data).map((key, i) => i === 0 ? key + " = ?" : ", " + key + " = ?").join("")} WHERE id = ?`,
        [...Object.values(data), id], (error) => {
          if (error) {
            return reject(new Error(error));
          }
        })
      this.db.get(`SELECT * FROM ${this.table} WHERE id = ?`, id, (error, row) => {
        if (error) {
          return reject(error)
        } else {
          resolve(row && new Model(row, this.hidden));
        }
      })
    })
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${this.table} WHERE id = ?`,
        id,
        (error) => {
          if (error) {
            reject(error)
          } else {
            resolve({ status: "Ok" });
          }
        })
    })
  }

}

module.exports = { Model };