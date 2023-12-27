import { Router } from 'express';

import { createExpense, updateExpense, getAllExpenses } from '../controllers';

const router = Router();

router.post('/create', createExpense);
router.put('/update', updateExpense);
router.post('/getAll', getAllExpenses);

export default router;
