const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function isAuthenticated(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: "AUTH_REQUIRED" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub || payload.id).select("_id name email language");

    if (!user) {
      return res.status(401).json({ error: "INVALID_SESSION" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
}

module.exports = { isAuthenticated };
