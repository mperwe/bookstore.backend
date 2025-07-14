const jwt = require('jsonwebtoken');
require("dotenv/config");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "UNAUTHORIZED: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log('Extracted Token:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(403).json({ message: "FORBIDDEN: Invalid or expired token" });
    }

    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  });
};
