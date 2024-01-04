import { Router } from 'express';

import { getBalance } from '../controllers';

const router = Router();

router.post('/', getBalance);

export default router;
