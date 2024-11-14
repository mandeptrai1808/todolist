// src/middlewares/authenticate.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header
  if (!token) return res.status(401).json({ message: 'Access denied.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Giải mã token
    req.user = { id: decoded.id }; // Gắn user_id vào req.user từ decoded token
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};
