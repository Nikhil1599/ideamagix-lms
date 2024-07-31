const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to check for JWT
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
