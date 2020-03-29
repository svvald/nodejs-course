import { Router } from 'express';

import loginValidator from '../middlewares/validators/login.validator';
import { AuthController } from '../../controllers/auth.controller';

const router = Router();

router.post('/login', loginValidator, AuthController.login);

export default router;
