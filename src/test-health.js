/**
 * Health Check Test Script
 * 
 * This script tests the health check endpoints to ensure they're working correctly.
 * Run with: node src/test-health.js
 */
require('dotenv').config();
const http = require('http');

// Configuration
const HOST = 'localhost';
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

/**
 * Make an HTTP request to the specified path
 * @param {string} path - The path to request
 * @returns {Promise<Object>} The response data
 */
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

/**
 * Test the basic health check endpoint
 */
async function testBasicHealth() {
  try {
    console.log('Testing basic health check endpoint...');
    const response = await makeRequest(`${API_PREFIX}/health`);
    
    console.log(`Status Code: ${response.statusCode}`);
    console.log('Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.statusCode === 200 && response.data.data.status === 'ok') {
      console.log('✅ Basic health check test passed!');
    } else {
      console.log('❌ Basic health check test failed!');
    }
    
    return response;
  } catch (error) {
    console.error('❌ Basic health check test failed with error:', error.message);
    throw error;
  }
}

/**
 * Test the detailed health check endpoint
 */
async function testDetailedHealth() {
  try {
    console.log('\nTesting detailed health check endpoint...');
    const response = await makeRequest(`${API_PREFIX}/health/detailed`);
    
    console.log(`Status Code: ${response.statusCode}`);
    console.log('Response (summary):');
    
    // Print a summary of the detailed health data
    const data = response.data.data;
    console.log(`- Status: ${data.status}`);
    console.log(`- Environment: ${data.environment}`);
    console.log(`- System Memory: ${data.system.memory.usage} used (${data.system.memory.free} free of ${data.system.memory.total})`);
    console.log(`- CPU Cores: ${data.system.cpu.cores}`);
    console.log(`- Database Status: ${data.services.database.status}`);
    console.log(`- Redis Status: ${data.services.redis.status}`);
    
    if (response.statusCode === 200) {
      console.log('✅ Detailed health check test passed!');
    } else {
      console.log('❌ Detailed health check test failed!');
    }
    
    return response;
  } catch (error) {
    console.error('❌ Detailed health check test failed with error:', error.message);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('=== HEALTH CHECK ENDPOINT TESTS ===');
  console.log(`Server: http://${HOST}:${PORT}`);
  console.log(`API Prefix: ${API_PREFIX}`);
  console.log('================================\n');
  
  try {
    await testBasicHealth();
    await testDetailedHealth();
    
    console.log('\n=== ALL TESTS COMPLETED ===');
  } catch (error) {
    console.error('\n❌ Tests failed with error:', error.message);
    process.exit(1);
  }
}

// Run the tests
console.log('NOTE: Make sure your server is running before executing this test script.');
console.log('You can start the server with: npm run dev\n');
console.log('Press Ctrl+C to cancel or any key to continue...');

// Wait for user input before starting tests
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
  runTests();
});