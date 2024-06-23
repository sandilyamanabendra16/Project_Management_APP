const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
  // Check if the Authorization header exists
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    // No Authorization header found
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    // Token is empty after removing 'Bearer '
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Token verification failed
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
