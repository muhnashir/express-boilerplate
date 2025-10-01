/**
 * Product Controller
 * 
 * Handles product-related operations with proper validation and logging
 */
const Joi = require('joi');
const { StatusCodes } = require('../../consts/statusCodes');
const { successResponse, errorResponse } = require('../appctx/msg_processor');
const { validateRequest, asyncHandler } = require('../appctx/http_processor');

/**
 * Product request validation schema
 */
const ProductSchema = {
  create: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).default(0),
    isActive: Joi.boolean().default(true)
  })
};

/**
 * Create a new product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createProduct(req, res) {
  try {
    console.info('Creating new product with data:', JSON.stringify(req.body));
    
    // Note: Request validation is handled by validateRequest middleware
    
    // Mock product creation (in a real app, this would use a factory/repository)
    const product = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.info(`Product created successfully with ID: ${product.id}`);
    
    return res.status(StatusCodes.CREATED).json(
      successResponse('Product created successfully', product)
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      errorResponse('SERVER_ERROR', 'Failed to create product')
    );
  }
}

/**
 * Middleware for validating product creation requests
 */
const validateCreateProduct = validateRequest(ProductSchema.create);

module.exports = {
  createProduct,
  validateCreateProduct
};