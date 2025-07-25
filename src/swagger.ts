import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '+a educação',
      version: '1.0.0',
      description: 'API para o desafio técnico do grupo A Educação',
    },
    servers: [
      {
        url: 'http://localhost:4000',//TODO env
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
