import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
export const PORT = parseInt(process.env.PORT || '4000', 10);
export const NODE_ENV = process.env.NODE_ENV || 'local';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost';
export const APP_URL = process.env.APP_URL || 'http://localhost:4000';
