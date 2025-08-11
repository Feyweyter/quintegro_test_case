import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quintegro API',
      version: '1.0.0',
      description: 'REST API with Express.js and TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        UserRecord: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique user identifier',
              example: 'user-1'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            }
          },
          required: ['id', 'name']
        },
        AuthRecord: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'Reference to existing user ID',
              example: 'user-1'
            },
            login: {
              type: 'string',
              description: 'User login/username',
              example: 'john.doe'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123'
            }
          },
          required: ['userId', 'login', 'password']
        },
        LoginRequest: {
          type: 'object',
          properties: {
            login: {
              type: 'string',
              description: 'User login/username',
              example: 'john.doe'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123'
            }
          },
          required: ['login', 'password']
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
          },
          required: ['token']
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
