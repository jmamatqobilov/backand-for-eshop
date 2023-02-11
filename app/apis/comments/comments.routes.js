const { CommentController } = require("./comments.controller");
const { Router } = require("express");


const commentCon = new CommentController();

const publicCommentRoutes = Router()
  .get("/comments", commentCon.all)
  .get("/comments/:id", commentCon.one)

const protectedCommmentRoutes = Router()
  .post("/comments", commentCon.create)
  .put("/comments/:id", commentCon.update)
  .delete("/comments/:id", commentCon.delete)

module.exports = { publicCommentRoutes, protectedCommmentRoutes };