const { ProductController } = require("./products.controller");
const { Router } = require("express");
const { upload } = require("./upload");


const prs = new ProductController();

const publicProducts = Router()
  .get("/products", prs.all)
  .get("/products/:id", prs.one)
  
  const protectedProducts = Router()
  .post("/products", upload.single('image'), prs.create)
  .put("/products/:id", prs.update)
  .delete("/products/:id", prs.delete)

module.exports = { publicProducts, protectedProducts };