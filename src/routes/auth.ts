import { Router } from 'express';

import { createUser, logIn, getAllUsers } from '../controllers';

const router = Router();

router.post('/create', createUser);
router.post('/log-in', logIn);
router.post('/getAll', getAllUsers);

export default router;
