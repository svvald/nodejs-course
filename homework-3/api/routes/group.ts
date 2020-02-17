import { Container } from 'typedi';
import { Router } from 'express';

import middlewares from '../middlewares';
import { GroupsService } from '../../services/groups-service';

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
  const id = parseInt(req.params.id, 10);

  const group = await groupService.getGroupById(id);

  if (!group) {
    res.status(404).send('Group does not exist');
  } else {
    res.send(group);
  }
});

router.put('/:id', middlewares.groupValidator, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;

  const group = await groupService.updateGroupById(id, data);

  if (!group) {
    res.status(404).send('Group does not exist');
  } else {
    res.send(group);
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const affectedRows = await groupService.deleteGroupById(id);

  if (!affectedRows) {
    res.status(404).send('Group does not exist');
  } else {
    res.status(204).send();
  }
});

export default router;
