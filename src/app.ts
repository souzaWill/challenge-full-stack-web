import express from 'express';
import router from './routes/index';
import { exceptionHandler } from './middleware/exceptionHandler';
import cors from 'cors';
import { CORS_ORIGIN } from './config/env';

const app = express();

app
  .use(express.json())
  .use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    }),
  )
  .use(router)
  .use(exceptionHandler);

export default app;
