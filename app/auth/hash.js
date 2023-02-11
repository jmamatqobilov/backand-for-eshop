const bc = require("bcrypt");

class Hash {
  static async make(password) {
    const salt = await bc.genSalt(10)
    const hash = await bc.hash(password, salt);
    return hash;
  }

  static async check(password, hash) {
    return bc.compare(password, hash);
  }
}
module.exports = { Hash };