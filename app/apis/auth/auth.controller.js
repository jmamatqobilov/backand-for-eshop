const { User } = require("./auth.model");
const { JWTService } = require("../../auth/jwt");
const { Hash } = require("../../auth/hash");

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const hash = await Hash.make(password);
      const user = await User.save({ username, email, password: hash });
      const token = JWTService.generateToken(user);
      res.json({ token, user });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error("Invalid credintials");
      }
      if (!await Hash.check(password, user.password)) {
        throw new Error("Invalid credintials");
      }
      const token = JWTService.generateToken(user);
      res.json({ token, user });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async user(req, res) {
    try {
      res.json(req.user);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      const updatedUser = await User.update(id, req.body)
      res.json({ updatedUser, user });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      const status = await User.delete(id)
      res.json({ status, user });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

module.exports = { AuthController };