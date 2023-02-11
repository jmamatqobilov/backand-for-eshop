const PORT = process.env.PORT || 4000;

module.exports = {
  root: __dirname,
  PORT,
  host(path) {
    return "http://localhost:" + PORT + "/" + path;
  }
};
