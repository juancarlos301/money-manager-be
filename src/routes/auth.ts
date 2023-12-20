import { Router } from 'express';

import { createUser, logIn } from '../controllers';

const router = Router();

router.post('/create', createUser);
router.post('/log-in', logIn);

export default router;
