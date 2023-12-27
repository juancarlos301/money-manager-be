import { Router } from 'express';

import authController from './auth';
import expensesController from './expenses';
import incomesController from './incomes';
const router = Router();

router.use('/auth', authController);
router.use('/expenses', expensesController);
router.use('/incomes', incomesController);

export default router;
