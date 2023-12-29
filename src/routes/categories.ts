import { Router } from 'express';

import { createCategory, getAllCategories, updateCategory } from '../controllers';

const router = Router();

router.post('/create', createCategory);
router.put('/update', updateCategory);
router.post('/getAll', getAllCategories);

export default router;
