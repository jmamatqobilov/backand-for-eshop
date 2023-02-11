const { Router } = require("express");
const { AuthController } = require("./auth.controller");

const auth = new AuthController();

const publicAuth = Router()
  .post("/register", auth.register)
  .post("/login", auth.login);

const protectedAuth = Router()
  .get("/user", auth.user)
  .put("/users/:id", auth.update)
  .delete("/users/:id", auth.delete)

module.exports = { publicAuth, protectedAuth };
