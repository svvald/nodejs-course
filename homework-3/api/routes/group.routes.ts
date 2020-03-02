import { Container } from 'typedi';
import { Router } from 'express';

import middlewares from '../middlewares';
import { GroupsService } from '../../services/group.service';

const router = Router();
const groupService = Container.get(GroupsService);

router.post('/', middlewares.groupValidator, async (req, res) => {
  const data = req.body;

  const group = await groupService.createGroup(data);

  res.setHeader('Location', `${req.path}/${group.id}`);
  res.status(201).send(group);
});

router.get('/', async (req, res) => {
  const groups = await groupService.getGroups();

  res.send(groups);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const group = await groupService.getGroupById(id);

  if (!group) {
    res.status(404).send('Group does not exist');
  } else {
    res.send(group);
  }
});

router.put('/:id', middlewares.groupValidator, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const group = await groupService.updateGroupById(id, data);

  if (!group) {
    res.status(404).send('Group does not exist');
  } else {
    res.send(group);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const deleted = await groupService.deleteGroupById(id);

  if (!deleted) {
    res.status(404).send('Group does not exist');
  } else {
    res.status(204).send();
  }
});

router.post('/:id/addUsers', middlewares.userGroupValidator, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const users = await groupService.addUsersToGroup(id, data);

  if (!users) {
    res.status(404).send('Group does not exist');
  } else {
    res.status(201).send();
  }
});

export default router;
