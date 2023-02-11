const { JWTService } = require("../auth/jwt");
const { User } = require("../apis/auth/auth.model");

async function authmiddleware(req, res, next) {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      throw new Error("Unauthorized !");
    }
    const token = headers.slice(7);
    const isTokenValid = JWTService.isTokenValid(token);
    if (!isTokenValid) {
      throw new Error("Unauthorized !");
    }
    const id = JWTService.userId(token);
    const user = await User.findById(id);
    req['user'] = user;
    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

module.exports = { authmiddleware };