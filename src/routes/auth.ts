import { Router } from 'express';

import { createUser, logIn, getAllUsers, restorePassword } from '../controllers';

const router = Router();

router.post('/create', createUser);
router.post('/log-in', logIn);
router.post('/getAll', getAllUsers);
router.post('/restore-password', restorePassword);
router.post('/restore-password/send-email', getAllUsers);

export default router;
