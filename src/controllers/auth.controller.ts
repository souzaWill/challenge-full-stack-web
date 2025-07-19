import { Request, Response, NextFunction } from 'express';
import { login } from '../services/auth.service';

export async function handleLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
