/**
 * Ticket Factory
 * 
 * This factory handles all business logic related to tickets
 * and serves as an intermediary between controllers and repositories.
 */
const ticketRepository = require('../repositories/ticket');

/**
 * Find all tickets with optional filtering, pagination, and sorting
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Additional options (pagination, sorting)
 * @returns {Promise<Array>} Array of tickets
 */
async function findAll(filter = {}, options = {}) {
  return await ticketRepository.findAll(filter, options);
}

/**
 * Find a ticket by its ID
 * @param {string|number} id - Ticket ID
 * @returns {Promise<Object|null>} Ticket or null if not found
 */
async function findById(id) {
  return await ticketRepository.findById(id);
}

/**
 * Find tickets by user ID
 * @param {string|number} userId - User ID
 * @param {Object} options - Additional options (pagination, sorting)
 * @returns {Promise<Array>} Array of tickets
 */
async function findByUserId(userId, options = {}) {
  return await ticketRepository.findByUserId(userId, options);
}

/**
 * Create a new ticket
 * @param {Object} data - Ticket data
 * @returns {Promise<Object>} Created ticket
 */
async function create(data) {
  return await ticketRepository.create(data);
}

/**
 * Update a ticket by ID
 * @param {string|number} id - Ticket ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object|null>} Updated ticket or null if not found
 */
async function update(id, data) {
  return await ticketRepository.update(id, data);
}

/**
 * Delete a ticket by ID
 * @param {string|number} id - Ticket ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteTicket(id) {
  return await ticketRepository.delete(id);
}

/**
 * Assign a ticket to a user
 * @param {string|number} ticketId - Ticket ID
 * @param {string|number} userId - User ID
 * @returns {Promise<Object|null>} Updated ticket or null if not found
 */
async function assignToUser(ticketId, userId) {
  return await ticketRepository.assignToUser(ticketId, userId);
}

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
  update,
  delete: deleteTicket,
  assignToUser
};