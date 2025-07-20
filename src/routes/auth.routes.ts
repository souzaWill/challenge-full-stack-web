import { Router } from 'express';
import { validateData } from '../middleware/validationMiddleware';
import { loginSchema, registerSchema } from '../schemas/authSchema';
import { handleLogin, handleRegister } from '../controllers/auth.controller';

const router = Router();

router.post('/login', validateData(loginSchema), handleLogin);
router.post('/register', validateData(registerSchema), handleRegister);

export default router;
