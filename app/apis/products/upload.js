const multer = require("multer");
const { root } = require("../../dir");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let rootArr = root.split("/");
    cb(null, rootArr[rootArr.length - 1] + '/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.mimetype.slice(file.mimetype.indexOf("/") + 1))
  }
})
const upload = multer({ storage });

module.exports = { upload };