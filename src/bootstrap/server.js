/**
 * Server configuration and middleware setup
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('../app/middleware/errorHandler');
const { requestLogger } = require('../app/middleware/requestLogger');

/**
 * Configure Express server with middleware and settings
 * @param {express.Application} app - Express application instance
 */
function setupServer(app) {
  // Basic security middleware
  app.use(helmet());
  
  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  // Request parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Logging
  app.use(morgan('dev'));
  app.use(requestLogger);
  
  // Global error handler - should be registered last
  app.use(errorHandler);
}

module.exports = { setupServer };