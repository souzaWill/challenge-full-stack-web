import express from 'express';
import router from './routes/index';
import { exceptionHandler } from './middlewares/exceptionHandler';
import cors from 'cors';
import { CORS_ORIGIN } from './config/env';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();

app
  .use(express.json())
  .use(
    cors({
      origin: '*', //TODO
      credentials: true,
    }),
  )
  .use(rateLimiter)
  .use(router)
  .use(exceptionHandler);

export default app;
