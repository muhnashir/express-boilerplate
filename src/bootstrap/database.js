/**
 * Database connection setup
 */
const { Sequelize } = require('sequelize');

// Create Sequelize instance
let sequelize;

/**
 * Initialize database connection
 * @returns {Promise<Sequelize>} Sequelize instance
 */
async function connectDatabase() {
  try {
    // Get database configuration from environment variables
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'express_boilerplate',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      dialect: process.env.DB_DIALECT || 'mysql',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: parseInt(process.env.DB_POOL_MAX || '5'),
        min: parseInt(process.env.DB_POOL_MIN || '0'),
        acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000'),
        idle: parseInt(process.env.DB_POOL_IDLE || '10000')
      }
    };

    // Create Sequelize instance
    sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
        pool: dbConfig.pool,
        define: {
          timestamps: true,
          underscored: true
        }
      }
    );

    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

/**
 * Get the Sequelize instance
 * @returns {Sequelize} Sequelize instance
 */
function getSequelize() {
  if (!sequelize) {
    throw new Error('Database connection not initialized. Call connectDatabase() first.');
  }
  return sequelize;
}

/**
 * Close the database connection
 * @returns {Promise<void>}
 */
async function closeDatabase() {
  if (sequelize) {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

module.exports = {
  connectDatabase,
  getSequelize,
  closeDatabase
};