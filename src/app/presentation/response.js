/**
 * Response entities for API output standardization
 */
const { ResponseCodes } = require('../../consts/statusCodes');

/**
 * Base response structure
 */
class BaseResponse {
  /**
   * Create a base response
   * @param {string} status - Response status code
   * @param {string} message - Response message
   */
  constructor(status, message) {
    this.status = status;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Success response structure
 */
class SuccessResponse extends BaseResponse {
  /**
   * Create a success response
   * @param {string} message - Success message
   * @param {*} data - Response data
   * @param {Object} meta - Additional metadata
   */
  constructor(message, data = null, meta = {}) {
    super(ResponseCodes.SUCCESS, message || 'Operation successful');
    this.data = data;
    this.meta = meta;
  }
}

/**
 * Error response structure
 */
class ErrorResponse extends BaseResponse {
  /**
   * Create an error response
   * @param {string} code - Error code
   * @param {string} message - Error message
   * @param {*} details - Error details
   */
  constructor(code, message, details = null) {
    super(ResponseCodes.ERROR, message || 'An error occurred');
    this.code = code;
    this.details = details;
  }
}

/**
 * Paginated response structure
 */
class PaginatedResponse extends SuccessResponse {
  /**
   * Create a paginated response
   * @param {string} message - Success message
   * @param {Array} data - Response data array
   * @param {Object} pagination - Pagination information
   * @param {Object} meta - Additional metadata
   */
  constructor(message, data = [], pagination = {}, meta = {}) {
    super(message || 'Data retrieved successfully', data, meta);
    this.pagination = {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      totalItems: pagination.totalItems || 0,
      totalPages: pagination.totalPages || 0,
      ...pagination
    };
  }
}

/**
 * User response transformers
 */
const UserResponse = {
  /**
   * Transform user data for response
   * @param {Object} user - User data
   * @returns {Object} Transformed user data
   */
  transform: (user) => {
    if (!user) return null;
    
    // Remove sensitive data
    const { password, ...userData } = user;
    
    return userData;
  },
  
  /**
   * Transform user list for response
   * @param {Array} users - User data array
   * @returns {Array} Transformed user data array
   */
  transformList: (users) => {
    if (!users) return [];
    
    return users.map(UserResponse.transform);
  }
};

/**
 * Ticket response transformers
 */
const TicketResponse = {
  /**
   * Transform ticket data for response
   * @param {Object} ticket - Ticket data
   * @returns {Object} Transformed ticket data
   */
  transform: (ticket) => {
    if (!ticket) return null;
    
    return {
      ...ticket,
      // Add any computed properties or transformations here
    };
  },
  
  /**
   * Transform ticket list for response
   * @param {Array} tickets - Ticket data array
   * @returns {Array} Transformed ticket data array
   */
  transformList: (tickets) => {
    if (!tickets) return [];
    
    return tickets.map(TicketResponse.transform);
  }
};

module.exports = {
  BaseResponse,
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  UserResponse,
  TicketResponse
};