const jwt = require('jsonwebtoken');

// Middleware to verify admin role
const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access. Token required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    req.user = decoded; 
    next();
  } catch (err) {
    // Specific handling for TokenExpiredError
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }

    // General error handling
    console.error('JWT Error:', err.message);
    return res.status(403).json({ error: 'Invalid or malformed token.' });
  }
};

module.exports = adminMiddleware;
