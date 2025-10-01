/**
 * Product Router
 * 
 * Dedicated router for product endpoints
 */
const express = require('express');
const { asyncHandler } = require('../appctx/http_processor');
const productController = require('../ucase/product.controller');

/**
 * Setup product routes
 * @returns {express.Router} Express router
 */
function setupProductRoutes() {
  const productRouter = express.Router();
  
  // Create product endpoint with validation middleware
  productRouter.post(
    '/', 
    productController.validateCreateProduct,
    asyncHandler(productController.createProduct)
  );
  
  return productRouter;
}

module.exports = { setupProductRoutes };