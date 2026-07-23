const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { signToken, setAuthCookie, clearAuthCookie } = require('../utils/jwt');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(admin);
  setAuthCookie(res, token);

  return ApiResponse(res, 200, {
    token,
    admin: { id: admin._id, username: admin.username, email: admin.email },
  }, 'Logged in');
});

const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  return ApiResponse(res, 200, null, 'Logged out');
});

const me = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('username email');
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }
  return ApiResponse(res, 200, { admin }, 'OK');
});

module.exports = { login, logout, me };
