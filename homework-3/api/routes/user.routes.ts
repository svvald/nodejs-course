import { Router } from 'express';

import userValidator from '../middlewares/validators/user.validator';

import { UserController } from '../../controllers/user.controller';

const router = Router();

router.post('/', userValidator, UserController.createUser);

router.get('/', UserController.getUsersList);

router.get('/:id', UserController.getUserById);

router.put('/:id', userValidator, UserController.updateUserById);

router.delete('/:id', UserController.deleteUserById);

export default router;
