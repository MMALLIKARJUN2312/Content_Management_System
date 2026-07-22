const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const env = require('../config/env');

function authGuard(req, res, next) {
  const token = req.cookies?.token
    || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

  if (!token) {
    return next(new ApiError(401, 'Access denied. No authentication credentials found.'));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.admin = { id: decoded.id, username: decoded.username };
    next();
  } catch (_err) {
    next(new ApiError(403, 'Invalid or expired authorization token.'));
  }
}

module.exports = authGuard;
