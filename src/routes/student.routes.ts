import { Router } from 'express';
import { validateData } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createStudentSchema, updateStudentSchema } from '../schemas/studentSchema';
import { index, store, show, destroy, update } from '../controllers/student.controller';

const router = Router();

router.use(authMiddleware);
router.get('/', index);
router.post('/', validateData(createStudentSchema), store);
router.put('/:id', validateData(updateStudentSchema), update);
router.get('/:id', show);
router.delete('/:id', destroy);

export default router;
