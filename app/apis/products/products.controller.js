const { Product } = require("./products.model");
const { host } = require("../../dir");

class ProductController {

  async all(req, res) {
    try {
      const products = await Product
        .leftJoin("comments", "product_id", "id")
        .selectFromRight("")
        .groupBy("products.id", { count: "comments.id", avg: "comments.rate" })
        .get();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async one(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" })
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async create(req, res) {
    try {
      const { title, text } = req.body;
      const product = await Product.save({ title, text, image: host(req.file.filename) })
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const pro = await Product.findById(id);
      if (!pro) {
        return res.status(404).json({ message: "Product not found" })
      }
      const product = await Product.update(id, req.body)
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" })
      }
      const status = await Product.delete(id)
      res.json({ ...status, product });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

module.exports = { ProductController };