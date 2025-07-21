import { Request, Response, NextFunction } from 'express';
import { login, register } from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';

export async function handleLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function handleRegister(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const result = await register(name, email, password);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    next(err);
  }
}
