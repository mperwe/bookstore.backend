// Importing the jsonwebtoken library to verify JWT tokens.
const jwt = require('jsonwebtoken');

// Middleware function to protect routes by verifying JWT tokens.
const protect = (req, res, next) => {
  // Extracting the token from the Authorization header.
  // The header format is expected to be "Bearer <token>", so we split it by space and take the second part.
  const token = req.headers.authorization?.split(' ')[1];

  // If no token is provided, return a 401 Unauthorized response.
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verifying the token using the secret key from the environment variable.
    // If valid, it decodes the token and attaches the decoded payload to the `req.user` object.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Calling the `next` function to pass control to the next middleware or route handler.
    next();
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized response with an error message.
    res.status(401).json({ message: 'Token failed' });
  }
};

// Exporting the middleware function to be used in route definitions.
module.exports = protect;
