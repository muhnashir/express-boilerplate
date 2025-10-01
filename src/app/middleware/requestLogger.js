/**
 * Request logger middleware
 */

/**
 * Logs details about incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl, ip } = req;
  
  // Log request details
  console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} - IP: ${ip}`);
  
  // Log request body if present and not a file upload
  if (req.body && Object.keys(req.body).length > 0 && !req.is('multipart/form-data')) {
    console.log('Request Body:', JSON.stringify(req.body));
  }
  
  // Capture response data
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    
    return originalSend.call(this, body);
  };
  
  next();
}

module.exports = { requestLogger };