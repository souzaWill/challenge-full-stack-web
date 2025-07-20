import express from 'express';
import router from './routes/index';
import { exceptionHandler } from './middleware/exceptionHandler';
import cors from 'cors';//TODO set cors permissions 


const app = express();

app.use(express.json()).use(cors()).use(router).use(exceptionHandler);

export default app;
