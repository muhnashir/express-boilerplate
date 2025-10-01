/**
 * Message processor for handling API responses
 */
const { ResponseCodes } = require('../../consts/statusCodes');

/**
 * Creates a standardized success response
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @param {Object} meta - Additional metadata
 * @returns {Object} Formatted success response
 */
function successResponse(message, data = null, meta = {}) {
  return {
    status: ResponseCodes.SUCCESS,
    message: message || 'Operation successful',
    data: data,
    meta: meta,
    timestamp: new Date().toISOString()
  };
}

/**
 * Creates a standardized error response
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {*} details - Error details
 * @returns {Object} Formatted error response
 */
function errorResponse(code, message, details = null) {
  return {
    status: ResponseCodes.ERROR,
    code: code,
    message: message || 'An error occurred',
    details: details,
    timestamp: new Date().toISOString()
  };
}

/**
 * Creates a standardized paginated response
 * @param {string} message - Success message
 * @param {Array} data - Response data array
 * @param {Object} pagination - Pagination information
 * @param {Object} meta - Additional metadata
 * @returns {Object} Formatted paginated response
 */
function paginatedResponse(message, data = [], pagination = {}, meta = {}) {
  return {
    status: ResponseCodes.SUCCESS,
    message: message || 'Data retrieved successfully',
    data: data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      totalItems: pagination.totalItems || 0,
      totalPages: pagination.totalPages || 0,
      ...pagination
    },
    meta: meta,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse
};