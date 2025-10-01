/**
 * Helper Functions
 * 
 * This file contains utility functions used throughout the application.
 * See docs/helper.md for detailed documentation.
 */

/**
 * String Helpers
 */

/**
 * Formats a string by replacing placeholders with provided arguments
 * @param {string} str - The string containing placeholders (e.g., {0}, {1}, etc.)
 * @param {...any} args - Values to replace placeholders
 * @returns {string} Formatted string
 */
function formatString(str, ...args) {
  return str.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
}

/**
 * Converts a string to a URL-friendly slug
 * @param {string} str - The string to convert
 * @returns {string} URL-friendly slug
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Date Helpers
 */

/**
 * Formats a date according to the specified format
 * @param {Date|string} date - The date to format
 * @param {string} format - The format string (default: 'YYYY-MM-DD')
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  const d = date instanceof Date ? date : new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Adds the specified number of days to a date
 * @param {Date} date - The base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Object Helpers
 */

/**
 * Creates a new object with only the specified keys from the original object
 * @param {Object} obj - The source object
 * @param {Array} keys - Array of keys to pick
 * @returns {Object} New object with only the specified keys
 */
function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

/**
 * Creates a new object without the specified keys from the original object
 * @param {Object} obj - The source object
 * @param {Array} keys - Array of keys to omit
 * @returns {Object} New object without the specified keys
 */
function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Validation Helpers
 */

/**
 * Checks if a string is a valid email address
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a valid email address, false otherwise
 */
function isEmail(str) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

/**
 * Checks if a string is a strong password
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a strong password, false otherwise
 */
function isStrongPassword(str) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(str);
}

/**
 * File Helpers
 */

/**
 * Gets the extension of a file
 * @param {string} filename - The filename
 * @returns {string} File extension
 */
function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Security Helpers
 */

/**
 * Hashes a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a password with a hash
 * @param {string} password - The password to check
 * @param {string} hash - The hash to compare against
 * @returns {Promise<boolean>} True if the password matches the hash, false otherwise
 */
async function comparePassword(password, hash) {
  const bcrypt = require('bcrypt');
  return bcrypt.compare(password, hash);
}

module.exports = {
  // String helpers
  formatString,
  slugify,
  
  // Date helpers
  formatDate,
  addDays,
  
  // Object helpers
  pick,
  omit,
  
  // Validation helpers
  isEmail,
  isStrongPassword,
  
  // File helpers
  getFileExtension,
  formatFileSize,
  
  // Security helpers
  hashPassword,
  comparePassword
};