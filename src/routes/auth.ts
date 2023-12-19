import { Router } from "express";

import { createUser } from "../controllers";

const router = Router();

router.post("/create", createUser);

export default router;
