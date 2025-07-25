import { Request, Response, NextFunction } from 'express';
import { login, register } from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';

export async function handleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function handleRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await register(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    next(err);
  }
}
