const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signToken(admin) {
  return jwt.sign({ id: admin._id, username: admin.username }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

const COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE_MS,
  });
}

function clearAuthCookie(res) {
  res.clearCookie('token', { path: '/' });
}

module.exports = { signToken, setAuthCookie, clearAuthCookie };
