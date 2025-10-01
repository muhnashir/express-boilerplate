/**
 * Ticket Controller
 */
const { StatusCodes } = require('../../consts/statusCodes');
const ticketFactory = require('../factory/ticket');
const { SuccessResponse, ErrorResponse, PaginatedResponse, TicketResponse } = require('../presentation/response');
const { validateRequest } = require('../appctx/http_processor');
const { TicketRequest } = require('../presentation/request');

/**
 * Get all tickets with optional filtering and pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllTickets(req, res) {
  try {
    // Extract filter and pagination options from query params
    const { page, limit, sortBy, sortOrder, ...filter } = req.query;
    
    // Get tickets from factory
    const result = await ticketFactory.findAll(filter, { page, limit, sortBy, sortOrder });
    
    // Transform and return response
    const tickets = TicketResponse.transformList(result.data || result);
    
    // Check if pagination info is available
    if (result.pagination) {
      return res.status(StatusCodes.OK).json(
        new PaginatedResponse('Tickets retrieved successfully', tickets, result.pagination)
      );
    }
    
    return res.status(StatusCodes.OK).json(
      new SuccessResponse('Tickets retrieved successfully', tickets)
    );
  } catch (error) {
    console.error('Error getting tickets:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse('SERVER_ERROR', 'Failed to retrieve tickets')
    );
  }
}

/**
 * Get a ticket by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getTicketById(req, res) {
  try {
    const { id } = req.params;
    
    // Get ticket from factory
    const ticket = await ticketFactory.findById(id);
    
    // Check if ticket exists
    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND).json(
        new ErrorResponse('NOT_FOUND', `Ticket with ID ${id} not found`)
      );
    }
    
    // Transform and return response
    const transformedTicket = TicketResponse.transform(ticket);
    
    return res.status(StatusCodes.OK).json(
      new SuccessResponse('Ticket retrieved successfully', transformedTicket)
    );
  } catch (error) {
    console.error('Error getting ticket:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse('SERVER_ERROR', 'Failed to retrieve ticket')
    );
  }
}

/**
 * Create a new ticket
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createTicket(req, res) {
  try {
    // Validate request body
    const { error, value } = TicketRequest.create.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(StatusCodes.BAD_REQUEST).json(
        new ErrorResponse('VALIDATION_ERROR', 'Validation failed', details)
      );
    }
    
    // Add user ID from authenticated user (if available)
    const ticketData = {
      ...value,
      createdBy: req.user ? req.user.id : null
    };
    
    // Create ticket using factory
    const ticket = await ticketFactory.create(ticketData);
    
    // Transform and return response
    const transformedTicket = TicketResponse.transform(ticket);
    
    return res.status(StatusCodes.CREATED).json(
      new SuccessResponse('Ticket created successfully', transformedTicket)
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse('SERVER_ERROR', 'Failed to create ticket')
    );
  }
}

/**
 * Update a ticket by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateTicket(req, res) {
  try {
    const { id } = req.params;
    
    // Validate request body
    const { error, value } = TicketRequest.update.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(StatusCodes.BAD_REQUEST).json(
        new ErrorResponse('VALIDATION_ERROR', 'Validation failed', details)
      );
    }
    
    // Check if ticket exists
    const existingTicket = await ticketFactory.findById(id);
    if (!existingTicket) {
      return res.status(StatusCodes.NOT_FOUND).json(
        new ErrorResponse('NOT_FOUND', `Ticket with ID ${id} not found`)
      );
    }
    
    // Update ticket using factory
    const updatedTicket = await ticketFactory.update(id, value);
    
    // Transform and return response
    const transformedTicket = TicketResponse.transform(updatedTicket);
    
    return res.status(StatusCodes.OK).json(
      new SuccessResponse('Ticket updated successfully', transformedTicket)
    );
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse('SERVER_ERROR', 'Failed to update ticket')
    );
  }
}

/**
 * Delete a ticket by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteTicket(req, res) {
  try {
    const { id } = req.params;
    
    // Check if ticket exists
    const existingTicket = await ticketFactory.findById(id);
    if (!existingTicket) {
      return res.status(StatusCodes.NOT_FOUND).json(
        new ErrorResponse('NOT_FOUND', `Ticket with ID ${id} not found`)
      );
    }
    
    // Delete ticket using factory
    await ticketFactory.delete(id);
    
    return res.status(StatusCodes.OK).json(
      new SuccessResponse('Ticket deleted successfully')
    );
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse('SERVER_ERROR', 'Failed to delete ticket')
    );
  }
}

/**
 * Assign a ticket to a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function assignTicket(req, res) {
  try {
    const { id } = req.params;
    
    // Validate request body
    const { error, value } = TicketRequest.assign.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(StatusCodes.BAD_REQUEST).json(
        new ErrorResponse('VALIDATION_ERROR', 'Validation failed', details)
      );
    }
    
    // Check if ticket exists
    const existingTicket = await ticketFactory.findById(id);
    if (!existingTicket) {
      return res.status(StatusCodes.NOT_FOUND).json(
        new ErrorResponse('NOT_FOUND', `Ticket with ID ${id} not found`)
      );
    }
    
    // Assign ticket to user using factory
    const updatedTicket = await ticketFactory.assignToUser(id, value.assigneeId);
    
    // Transform and return response
    const transformedTicket = TicketResponse.transform(updatedTicket);
    
    return res.status(StatusCodes.OK).json(
      new SuccessResponse('Ticket assigned successfully', transformedTicket)
    );
  } catch (error) {
    console.error('Error assigning ticket:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse('SERVER_ERROR', 'Failed to assign ticket')
    );
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  assignTicket
};