import { Router } from 'express';
import { validateData } from '../middlewares/validationMiddleware';
import { loginSchema, registerSchema } from '../schemas/authSchema';
import { handleLogin, handleRegister } from '../controllers/auth.controller';

const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login do usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakeTokenExample1234567890
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: Fulano de Tal
 *       401:
 *         description: E-mail ou senha inválidos.
 */
router.post('/login', validateData(loginSchema), handleLogin);

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Registro de novo usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fulano de Tal
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *               confirmPassword:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 7a94c85c-fe6d-40cc-9e84-21022c088694
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: Fulano de Tal
 *       400:
 *         description: Requisição invalida
 */
router.post('/register', validateData(registerSchema), handleRegister);

export default router;
