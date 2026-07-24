const ApiError = require('../utils/ApiError');

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function normalize(err) {
  if (err instanceof ApiError) return err;

  if (err.type === 'entity.parse.failed') {
    return new ApiError(400, 'Malformed JSON in request body');
  }

  if (err.name === 'CastError') {
    return new ApiError(400, `Invalid id: ${err.value}`);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return new ApiError(409, `A record with that ${field} already exists`);
  }

  if (err.name === 'ValidationError') {
    return new ApiError(400, err.message);
  }

  return new ApiError(500, err.message || 'Internal server error');
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const normalized = normalize(err);
  const message =
    normalized.statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : normalized.message;

  if (normalized.statusCode === 500) {
    console.error(err);
  }

  res.status(normalized.statusCode).json({
    success: false,
    message,
    ...(normalized.details ? { details: normalized.details } : {}),
  });
}

module.exports = { notFound, errorHandler };
