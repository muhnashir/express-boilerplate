/**
 * Health Check Controller
 * 
 * Provides comprehensive health check functionality for the application
 * including database, cache, and other service dependencies.
 */
const os = require('os');
const { StatusCodes } = require('../../consts/statusCodes');
const { getSequelize } = require('../../bootstrap/database');
const { successResponse } = require('../appctx/msg_processor');

/**
 * Get basic health status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getBasicHealth(req, res) {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  return res.status(StatusCodes.OK).json(
    successResponse('Health check successful', healthData)
  );
}

/**
 * Get detailed health status including database, memory, and CPU
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getDetailedHealth(req, res) {
  try {
    // Basic health data
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    // System information
    const systemInfo = {
      memory: {
        total: formatBytes(os.totalmem()),
        free: formatBytes(os.freemem()),
        usage: `${Math.round((os.totalmem() - os.freemem()) / os.totalmem() * 100)}%`
      },
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0].model,
        load: os.loadavg()
      },
      platform: {
        type: os.type(),
        release: os.release(),
        architecture: os.arch()
      }
    };
    
    // Database health check
    const dbStatus = await checkDatabaseHealth();
    
    // Redis health check (if available)
    const redisStatus = await checkRedisHealth();
    
    // Combine all health data
    const detailedHealth = {
      ...healthData,
      system: systemInfo,
      services: {
        database: dbStatus,
        redis: redisStatus
      }
    };
    
    // Determine overall status
    detailedHealth.status = determineOverallStatus(detailedHealth);
    
    return res.status(StatusCodes.OK).json(
      successResponse('Detailed health check successful', detailedHealth)
    );
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Failed to retrieve health information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Check database connection health
 * @returns {Object} Database health status
 */
async function checkDatabaseHealth() {
  try {
    const sequelize = getSequelize();
    const startTime = Date.now();
    await sequelize.authenticate();
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'ok',
      responseTime: `${responseTime}ms`,
      connection: 'active'
    };
  } catch (error) {
    console.error('Database health check failed:', error);
    return {
      status: 'error',
      error: error.message,
      connection: 'inactive'
    };
  }
}

/**
 * Check Redis connection health
 * @returns {Object} Redis health status
 */
async function checkRedisHealth() {
  try {
    // This is a placeholder. In a real application, you would use your Redis client
    // For example: const redis = require('../pkg/redisClient');
    
    // Simulate Redis check
    if (process.env.REDIS_HOST) {
      // Simulated response for demonstration
      return {
        status: 'ok',
        responseTime: '5ms',
        connection: 'active'
      };
    }
    
    return {
      status: 'unknown',
      message: 'Redis not configured'
    };
  } catch (error) {
    console.error('Redis health check failed:', error);
    return {
      status: 'error',
      error: error.message,
      connection: 'inactive'
    };
  }
}

/**
 * Format bytes to human-readable format
 * @param {number} bytes - Bytes to format
 * @returns {string} Formatted string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Determine overall health status based on all checks
 * @param {Object} healthData - Health check data
 * @returns {string} Overall status
 */
function determineOverallStatus(healthData) {
  // Check database status
  if (healthData.services.database.status === 'error') {
    return 'critical';
  }
  
  // Check Redis status if it's configured
  if (healthData.services.redis.status === 'error' && 
      healthData.services.redis.status !== 'unknown') {
    return 'warning';
  }
  
  // Check memory usage
  const memoryUsagePercentage = parseInt(healthData.system.memory.usage);
  if (memoryUsagePercentage > 90) {
    return 'warning';
  }
  
  return 'ok';
}

module.exports = {
  getBasicHealth,
  getDetailedHealth
};