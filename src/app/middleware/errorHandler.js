/**
 * Global error handler middleware
 */
const { StatusCodes } = require('../../consts/statusCodes');
const { errorResponse } = require('../appctx/msg_processor');

/**
 * Express error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // Default error status and message
  const status = err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json(
      errorResponse('VALIDATION_ERROR', message, err.details)
    );
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      errorResponse('UNAUTHORIZED', 'Authentication required')
    );
  }
  
  // Generic error response
  return res.status(status).json(
    errorResponse('SERVER_ERROR', message, process.env.NODE_ENV === 'development' ? err.stack : undefined)
  );
}

module.exports = { errorHandler };