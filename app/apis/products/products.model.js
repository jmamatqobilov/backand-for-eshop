const { Model } = require("../../model/model");

class Product extends Model {
  static table = "products";
  static fields = ["title", "image", "text"];
}

module.exports = { Product };