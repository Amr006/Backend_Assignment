const userController = require("../controllers/user.controller");
const { schema } = require("../models/user.model");

async function routes(fastify, options) {
  fastify.get("/",{ 
    schema: {
      description: 'Retrieve a list of users',
      tags: ['user'],
      querystring: {
        limit: { type: 'string', description: 'Limit response data'},
        page: { type: 'string', description: 'Page number',  },
        search: { type: 'string', description: 'Search for users' }
      },
      response: {
        200: {
          description: 'Successful response. Returns an array of users',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              // Add other properties here as needed
            }
          }
        },
        500: {
          description: 'Internal server error. Failed to retrieve users',
          type: 'object',
          properties: {
            error: { type: 'string' }
            // Add other properties here as needed
          }
        }
      }
    }
    
  }, userController.getAllUsers);
  fastify.get("/:id",{
    schema: {
      description: 'Retrieve a user by ID',
      tags: ['user'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User ID' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Successful response. Returns the user object',
          type: 'object',
          properties: {
            _id: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
            // Add other properties here as needed
          }
        },
        404: {
          description: 'User not found. The requested user does not exist',
          type: 'string'
        },
        500: {
          description: 'Internal server error. Failed to retrieve user',
          type: 'string'
        }
      }
    }
    
  }, userController.getUserById);
  fastify.post("/",{schema: {
    description: 'Create a new user',
    tags: ['user'],
    body: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        password: { type: 'string' },
        // Add other properties here as needed
      },
      required: ['email', 'password','firstName','lastName']
    },
    response: {
      200: {
        description: 'Successful response. Returns the created user object',
        type: 'object',
        properties: {
        _id: { type: 'string' },
          firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        password: { type: 'string'}
          // Add other properties here as needed
        }
      },
      500: {
        description: 'Internal server error. Failed to create user',
        type: 'string'
      }
    }
  }
  }, userController.createUser);
  fastify.put("/:id",{schema: {
    description: 'Update an existing user',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'User ID' }
      },
      required: ['id']
    },
    body: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        // Add other properties here as needed
      }
    },
    response: {
      200: {
        description: 'Successful response. Returns the updated user object',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
          // Add other properties here as needed
        }
      },
      404: {
        description: 'User not found. The requested user does not exist',
        type: 'string'
      },
      500: {
        description: 'Internal server error. Failed to update user',
        type: 'string'
      }
    }
  }
  }, userController.updateUser);
  fastify.delete("/:id",{schema: {
    description: 'Delete an existing user',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'User ID' }
      },
      required: ['id']
    },
    response: {
      204: {
        description: 'No content. User successfully deleted',
        type: 'string'
      },
      500: {
        description: 'Internal server error. Failed to delete user',
        type: 'string'
      }
    }
  }
  }, userController.deleteUser);
}

module.exports = routes;
