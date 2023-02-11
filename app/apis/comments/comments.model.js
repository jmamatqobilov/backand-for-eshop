const { Model } = require("../../model/model");

class Comment extends Model {
  static table = "comments";
  static fields = ["user_id", "product_id", "rate", "text"];
}

module.exports = { Comment };