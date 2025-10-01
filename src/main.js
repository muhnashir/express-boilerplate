/**
 * Main application entry point
 */
require('dotenv').config();
const express = require('express');
const { setupServer } = require('./bootstrap/server');
const { connectDatabase } = require('./bootstrap/database');
const { setupRoutes } = require('./app/router/http');

async function startServer() {
  try {
    // Initialize Express app
    const app = express();
    
    // Setup server configurations (middleware, etc.)
    setupServer(app);
    
    // Connect to database
    await connectDatabase();
    
    // Setup routes
    setupRoutes(app);
    
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer();