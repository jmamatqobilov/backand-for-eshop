const { Router } = require("express");
const { publicAuth, protectedAuth } = require("./apis/auth/auth.routes");
const { publicProducts, protectedProducts } = require("./apis/products/products.routes");
const { publicCommentRoutes, protectedCommmentRoutes } = require("./apis/comments/comments.routes");
const { authmiddleware } = require("./middlewares/auth")


const publicRoutes = Router()
  .use(publicAuth)
  .use(publicProducts)
  .use(publicCommentRoutes)

const protectedRoutes = Router()
  .use(authmiddleware)
  .use(protectedAuth)
  .use(protectedCommmentRoutes)
  .use(protectedProducts)


module.exports = { publicRoutes, protectedRoutes };