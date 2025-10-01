/**
 * HTTP processor for handling and validating requests
 */
const Joi = require('joi');
const { StatusCodes } = require('../../consts/statusCodes');
const { errorResponse } = require('./msg_processor');

/**
 * Validates request data against a Joi schema
 * @param {Object} schema - Joi validation schema
 * @param {string} source - Request property to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware function
 */
function validateRequest(schema, source = 'body') {
  return (req, res, next) => {
    if (!schema) return next();
    
    const data = req[source];
    const { error, value } = schema.validate(data, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(StatusCodes.BAD_REQUEST).json(
        errorResponse('VALIDATION_ERROR', 'Validation failed', details)
      );
    }
    
    // Replace request data with validated data
    req[source] = value;
    next();
  };
}

/**
 * Creates a validation schema for pagination parameters
 * @returns {Object} Joi validation schema
 */
function paginationSchema() {
  return Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
  });
}

/**
 * Wraps an async route handler to catch errors
 * @param {Function} fn - Async route handler function
 * @returns {Function} Express middleware function
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {Object} data - Data to sanitize
 * @returns {Object} Sanitized data
 */
function sanitizeInput(data) {
  if (!data) return data;
  
  if (typeof data === 'string') {
    // Basic XSS prevention
    return data
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeInput(item));
  }
  
  if (typeof data === 'object') {
    const sanitized = {};
    for (const key in data) {
      sanitized[key] = sanitizeInput(data[key]);
    }
    return sanitized;
  }
  
  return data;
}

module.exports = {
  validateRequest,
  paginationSchema,
  asyncHandler,
  sanitizeInput
};