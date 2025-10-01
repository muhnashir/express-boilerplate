/**
 * Test script to verify database connection
 */
require('dotenv').config();
const { Sequelize } = require('sequelize');

async function testConnection() {
  // Get database configuration from environment variables
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'express_boilerplate',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || 'mysql'
  };

  console.log('Testing database connection with the following configuration:');
  console.log(`Host: ${dbConfig.host}`);
  console.log(`Port: ${dbConfig.port}`);
  console.log(`Database: ${dbConfig.database}`);
  console.log(`Username: ${dbConfig.username}`);
  console.log(`Dialect: ${dbConfig.dialect}`);

  // Create Sequelize instance
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: console.log
    }
  );

  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Close the connection
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Run the test
testConnection();