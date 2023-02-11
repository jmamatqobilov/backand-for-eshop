const express = require("express");
const cors = require("cors");
const { publicRoutes, protectedRoutes } = require("./router");
const { PORT } = require("./dir");

function run() {
  const app = express();
  app.use(express.json());
  app.listen(PORT, () => {
    console.log("Server running at PORT", PORT);
  })
  app.use(cors({
    origin: "*"
  }));
  app.use(express.static(__dirname + "/images"));
  app.use("/api", publicRoutes);
  app.use("/api", protectedRoutes);
}

run();
