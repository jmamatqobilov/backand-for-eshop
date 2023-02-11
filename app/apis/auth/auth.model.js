const { Model } = require("../../model/model");

class User extends Model {
  static table = "users";
  static fields = ["username", "email", "password"];
  static hidden = ['password']
}

module.exports = { User };