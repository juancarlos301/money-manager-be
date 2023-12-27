import { Router } from 'express';

import { createIncome, updateIncome, getAllIncomes } from '../controllers';

const router = Router();

router.post('/create', createIncome);
router.put('/update', updateIncome);
router.post('/getAll', getAllIncomes);

export default router;
