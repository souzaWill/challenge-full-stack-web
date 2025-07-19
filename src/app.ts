import express from 'express';
import router from './routes/index';
import { exceptionHandler } from './middleware/exceptionHandler';

const app = express();

app.use(express.json()).use(router).use(exceptionHandler);

export default app;
