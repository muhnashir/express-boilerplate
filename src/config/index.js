/**
 * Configuration loader
 * 
 * Loads configuration from environment variables and config files
 */
const path = require('path');
const fs = require('fs');
const yaml = require('yamljs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

/**
 * Application configuration
 */
const config = {
  // Application settings
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    apiPrefix: process.env.API_PREFIX || '/api/v1',
    allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*']
  },
  
  // Database settings
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    name: process.env.DB_NAME || 'express_boilerplate',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || 'mysql',
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '5', 10),
      min: parseInt(process.env.DB_POOL_MIN || '0', 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10)
    }
  },
  
  // Authentication settings
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },
  
  // Logging settings
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined'
  },
  
  // Redis settings (for job queue and caching)
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || ''
  },
  
  // Email settings
  email: {
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASS || 'your-password',
    from: process.env.SMTP_FROM || 'noreply@example.com'
  },
  
  // Messages
  messages: {}
};

/**
 * Load YAML configuration file
 * @param {string} filePath - Path to YAML file
 * @returns {Object} Parsed YAML content
 */
function loadYamlConfig(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return yaml.load(filePath);
    }
    console.warn(`Config file not found: ${filePath}`);
    return {};
  } catch (error) {
    console.error(`Error loading config file ${filePath}:`, error);
    return {};
  }
}

// Load message configuration
const msgConfigPath = path.resolve(__dirname, '../../config/msg.yaml');
config.messages = loadYamlConfig(msgConfigPath);

/**
 * Get configuration value by key path
 * @param {string} keyPath - Dot notation path to configuration value
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} Configuration value
 */
function get(keyPath, defaultValue = undefined) {
  const keys = keyPath.split('.');
  let result = config;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  
  return result;
}

/**
 * Get all configuration
 * @returns {Object} Complete configuration object
 */
function getAll() {
  return { ...config };
}

module.exports = {
  get,
  getAll
};