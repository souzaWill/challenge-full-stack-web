import { Router } from 'express';
import authRoutes from './auth.routes';
import studentRoutes from './student.routes';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/', authRoutes);
router.use('/students', studentRoutes);

export default router;
