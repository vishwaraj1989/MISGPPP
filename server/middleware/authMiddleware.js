// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { promisify } = require('util');

const verifyToken = promisify(jwt.verify);

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = await verifyToken(token, process.env.JWT_SECRET);
    const existingUser = await User.findById(user.id);

    if (!existingUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = existingUser;
    next();
  } catch (err) {
    console.error('Token verification or user fetching error:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authenticateToken;
