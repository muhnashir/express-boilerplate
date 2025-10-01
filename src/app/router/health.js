/**
 * Health Check Router
 * 
 * Dedicated router for health check endpoints
 */
const express = require('express');
const { asyncHandler } = require('../appctx/http_processor');
const healthController = require('../ucase/health.controller');

/**
 * Setup health check routes
 * @returns {express.Router} Express router
 */
function setupHealthRoutes() {
  const healthRouter = express.Router();
  
  // Basic health check endpoint
  healthRouter.get('/', asyncHandler(healthController.getBasicHealth));
  
  // Detailed health check endpoint
  healthRouter.get('/detailed', asyncHandler(healthController.getDetailedHealth));
  
  return healthRouter;
}

module.exports = { setupHealthRoutes };