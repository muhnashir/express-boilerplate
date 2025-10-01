/**
 * Request entities for API input validation
 */
const Joi = require('joi');

/**
 * Base request validation schema
 */
const BaseRequestSchema = {
  /**
   * Pagination schema for list requests
   */
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
  })
};

/**
 * User request validation schemas
 */
const UserRequest = {
  /**
   * Create user request schema
   */
  create: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().max(100),
    role: Joi.string().valid('user', 'admin').default('user')
  }),
  
  /**
   * Update user request schema
   */
  update: Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    fullName: Joi.string().max(100),
    role: Joi.string().valid('user', 'admin')
  }),
  
  /**
   * Login request schema
   */
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

/**
 * Ticket request validation schemas
 */
const TicketRequest = {
  /**
   * Create ticket request schema
   */
  create: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed').default('open'),
    dueDate: Joi.date().iso().min('now'),
    assigneeId: Joi.number().integer().positive()
  }),
  
  /**
   * Update ticket request schema
   */
  update: Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    priority: Joi.string().valid('low', 'medium', 'high'),
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed'),
    dueDate: Joi.date().iso(),
    assigneeId: Joi.number().integer().positive()
  }),
  
  /**
   * Assign ticket request schema
   */
  assign: Joi.object({
    assigneeId: Joi.number().integer().positive().required()
  }),
  
  /**
   * Filter tickets request schema
   */
  filter: Joi.object({
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed'),
    priority: Joi.string().valid('low', 'medium', 'high'),
    assigneeId: Joi.number().integer().positive(),
    title: Joi.string(),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso().min(Joi.ref('fromDate'))
  }).concat(BaseRequestSchema.pagination)
};

module.exports = {
  BaseRequestSchema,
  UserRequest,
  TicketRequest
};