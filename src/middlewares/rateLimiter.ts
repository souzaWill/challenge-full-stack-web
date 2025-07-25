import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

const disabled = process.env.NODE_ENV === 'test';
export const rateLimiter = disabled
  ? (req: Request, res: Response, next: NextFunction) => next()
  : rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 60,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Limite de requisições excedido. Tente novamente em breve.',
    });
