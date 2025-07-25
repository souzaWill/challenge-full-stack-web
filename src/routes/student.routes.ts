import { Router } from 'express';
import { validateData } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createStudentSchema, updateStudentSchema } from '../schemas/studentSchema';
import { index, store, show, destroy, update } from '../controllers/student.controller';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /students:
 *   get:
 *     summary: Lista todos os estudantes
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: Não autorizado
 */
router.get('/', index);

/**
 * @openapi
 * /students:
 *   post:
 *     summary: Cria um novo estudante
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentInput'
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', validateData(createStudentSchema), store);

/**
 * @openapi
 * /students/{id}:
 *   put:
 *     summary: Atualiza um estudante pelo ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estudante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStudentInput'
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Estudante não encontrado
 *       401:
 *         description: Não autorizado
 */router.put('/:id', validateData(updateStudentSchema), update);

/**
 * @openapi
 * /students/{id}:
 *   get:
 *     summary: Busca um estudante pelo ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estudante
 *     responses:
 *       200:
 *         description: Estudante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Estudante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', show);

/**
 * @openapi
 * /students/{id}:
 *   delete:
 *     summary: Remove um estudante pelo ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estudante
 *     responses:
 *       204:
 *         description: Estudante removido com sucesso
 *       404:
 *         description: Estudante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', destroy);

export default router;
//TODO
/**
 * @openapi
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         userId:
 *           type: string
 *           format: uuid
 *           example: "987e6543-e21b-32d3-b456-426614170999"
 *         document:
 *           type: string
 *           example: "12345678901"
 *         registrationNumber:
 *           type: integer
 *           example: 12345
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: "987e6543-e21b-32d3-b456-426614170999"
 *             name:
 *               type: string
 *               example: "João da Silva"
 *             email:
 *               type: string
 *               format: email
 *               example: "joao.silva@example.com"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-01-01T10:00:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-01-15T15:30:00.000Z"
 */