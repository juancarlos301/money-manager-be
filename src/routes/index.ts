import { Router } from 'express';

import authController from './auth';
import expensesController from './expenses';
import incomesController from './incomes';
import categoriesController from './categories';

const router = Router();

router.use('/auth', authController);
router.use('/expenses', expensesController);
router.use('/incomes', incomesController);
router.use('/categories', categoriesController);

export default router;
