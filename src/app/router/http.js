/**
 * HTTP Router configuration
 */
const express = require('express');
const { StatusCodes } = require('../../consts/statusCodes');
const { errorResponse } = require('../appctx/msg_processor');
const { asyncHandler } = require('../appctx/http_processor');
const { setupHealthRoutes } = require('./health');
const { setupProductRoutes } = require('./product');

// Import controllers
// Example: const userController = require('../ucase/user.controller');

/**
 * Setup API routes
 * @param {express.Application} app - Express application
 */
function setupRoutes(app) {
  const apiRouter = express.Router();
  
  // API version prefix
  const apiPrefix = '/api/v1';
  
  // Health check routes
  apiRouter.use('/health', setupHealthRoutes());
  
  // Product routes
  apiRouter.use('/products', setupProductRoutes());
  
  // Example routes
  // Users routes
  // apiRouter.get('/users', asyncHandler(userController.getAllUsers));
  // apiRouter.get('/users/:id', asyncHandler(userController.getUserById));
  // apiRouter.post('/users', asyncHandler(userController.createUser));
  // apiRouter.put('/users/:id', asyncHandler(userController.updateUser));
  // apiRouter.delete('/users/:id', asyncHandler(userController.deleteUser));
  
  // Tickets routes (example)
  // const ticketRouter = express.Router();
  // ticketRouter.get('/', asyncHandler(ticketController.getAllTickets));
  // ticketRouter.get('/:id', asyncHandler(ticketController.getTicketById));
  // ticketRouter.post('/', asyncHandler(ticketController.createTicket));
  // ticketRouter.put('/:id', asyncHandler(ticketController.updateTicket));
  // ticketRouter.delete('/:id', asyncHandler(ticketController.deleteTicket));
  // apiRouter.use('/tickets', ticketRouter);
  
  // Register API routes with prefix
  app.use(apiPrefix, apiRouter);
  
  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    try {
      const swaggerDocument = YAML.load('./src/swagger/openapi.yaml');
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      console.log('Swagger documentation available at /api-docs');
    } catch (error) {
      console.error('Failed to load Swagger documentation:', error);
    }
  }
  
  // Handle 404 errors
  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(
      errorResponse('NOT_FOUND', `Route ${req.method} ${req.url} not found`)
    );
  });
}

module.exports = { setupRoutes };