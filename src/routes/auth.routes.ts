import { Router } from 'express';
import { validateData } from '../middleware/validationMiddleware';
import { loginSchema } from '../schemas/authSchema';
import { handleLogin } from '../controllers/auth.controller';

const router = Router();

router.post('/', validateData(loginSchema), handleLogin);

export default router;
