import { Router } from 'express';

import groupValidator from '../middlewares/validators/group.validator';
import userGroupValidator from '../middlewares/validators/user-group.validator';

import { GroupController } from '../../controllers/group.controller';

const router = Router();

router.post('/', groupValidator, GroupController.createGroup);

router.get('/', GroupController.getGroups);

router.get('/:id', GroupController.getGroupById);

router.put('/:id', groupValidator, GroupController.updateGroupById);

router.delete('/:id', GroupController.deleteGroupById);

router.post('/:id/addUsers', userGroupValidator, GroupController.addUsersToGroup);

export default router;
