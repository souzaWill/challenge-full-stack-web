import express from 'express';
import router from './routes/index';
import { exceptionHandler } from './middlewares/exceptionHandler';
import cors from 'cors';
import { CORS_ORIGIN } from './config/env';
import { rateLimiter } from './middlewares/rateLimiter';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app = express();

app
  .use(express.json())
  .use(
    cors({
      origin: '*', //TODO
      credentials: true,
    }),
  )
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use(rateLimiter)
  .use(router)
  .use(exceptionHandler);

export default app;
