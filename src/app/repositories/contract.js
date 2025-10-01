/**
 * Repository contracts (interfaces)
 * 
 * This file defines the interfaces that all repositories should implement.
 * It serves as a contract between the repositories and the business logic.
 */

/**
 * Base Repository Interface
 * 
 * All repositories should implement these methods.
 * 
 * @interface BaseRepository
 */
class BaseRepository {
  /**
   * Find all records with optional filtering, pagination, and sorting
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Additional options (pagination, sorting)
   * @returns {Promise<Array>} Array of records
   */
  async findAll(filter = {}, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Find a record by its ID
   * @param {string|number} id - Record ID
   * @returns {Promise<Object|null>} Record or null if not found
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Find a single record by criteria
   * @param {Object} criteria - Search criteria
   * @returns {Promise<Object|null>} Record or null if not found
   */
  async findOne(criteria) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Create a new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Update a record by ID
   * @param {string|number} id - Record ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object|null>} Updated record or null if not found
   */
  async update(id, data) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Delete a record by ID
   * @param {string|number} id - Record ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Count records with optional filtering
   * @param {Object} filter - Filter criteria
   * @returns {Promise<number>} Count of records
   */
  async count(filter = {}) {
    throw new Error('Method not implemented');
  }
}

/**
 * User Repository Interface
 * 
 * @interface UserRepository
 * @extends BaseRepository
 */
class UserRepository extends BaseRepository {
  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null if not found
   */
  async findByEmail(email) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Find a user by username
   * @param {string} username - Username
   * @returns {Promise<Object|null>} User or null if not found
   */
  async findByUsername(username) {
    throw new Error('Method not implemented');
  }
}

/**
 * Ticket Repository Interface
 * 
 * @interface TicketRepository
 * @extends BaseRepository
 */
class TicketRepository extends BaseRepository {
  /**
   * Find tickets by user ID
   * @param {string|number} userId - User ID
   * @param {Object} options - Additional options (pagination, sorting)
   * @returns {Promise<Array>} Array of tickets
   */
  async findByUserId(userId, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Find tickets by status
   * @param {string} status - Ticket status
   * @param {Object} options - Additional options (pagination, sorting)
   * @returns {Promise<Array>} Array of tickets
   */
  async findByStatus(status, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Assign a ticket to a user
   * @param {string|number} ticketId - Ticket ID
   * @param {string|number} userId - User ID
   * @returns {Promise<Object|null>} Updated ticket or null if not found
   */
  async assignToUser(ticketId, userId) {
    throw new Error('Method not implemented');
  }
}

module.exports = {
  BaseRepository,
  UserRepository,
  TicketRepository
};