/**
 * Test script for the product API
 */
const http = require('http');

// Product data for testing
const productData = {
  name: "Test Product",
  description: "This is a test product with a description that is longer than 10 characters",
  price: 29.99,
  category: "Test Category",
  stock: 100,
  isActive: true
};

// Invalid product data (missing required fields)
const invalidProductData = {
  name: "Te", // Too short
  price: -10, // Negative price
  category: "Test"
  // Missing description
};

/**
 * Make a POST request to create a product
 * @param {Object} data - Product data to send
 */
function testCreateProduct(data) {
  // Request options
  const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/api/v1/products',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Create request
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    let responseData = '';
    
    // Collect response data
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    // Process complete response
    res.on('end', () => {
      console.log('RESPONSE BODY:');
      console.log(JSON.parse(responseData));
    });
  });

  // Handle request errors
  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Send request with data
  req.write(JSON.stringify(data));
  req.end();
}

// Test with valid data
console.log('Testing with valid product data:');
testCreateProduct(productData);

// Wait 1 second before sending the next request
setTimeout(() => {
  console.log('\nTesting with invalid product data:');
  testCreateProduct(invalidProductData);
}, 1000);

console.log('Test requests sent. Check server logs for more details.');