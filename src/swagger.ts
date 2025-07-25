import swaggerJsdoc from 'swagger-jsdoc';
import { APP_URL } from './config/env';

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
        url: `${APP_URL}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
