const jwt = require("jsonwebtoken");
const uuid = require("uuid");

class JWTService {
  static generateToken(auth) {
    const payload = {
      id: auth.id,
      email: auth.email
    }
    const token = jwt.sign(payload, "SECRET_KEY", {
      expiresIn: "3000000d",
      jwtid: uuid.v4()
    })
    return token;
  }

  static isTokenValid(token) {
    try {
      jwt.verify(token, "SECRET_KEY", { ignoreExpiration: false });
      return true;
    } catch (e) {
      return false;
    }
  }

  static userId(token) {
    return jwt.decode(token)['id'];
  }
}

module.exports = { JWTService };