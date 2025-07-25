import { configure } from '@vendia/serverless-express';
import app from './app';

export const handler = configure({ app });
