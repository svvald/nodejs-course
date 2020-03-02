import { Router } from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import { UserInputDTO } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

const router = Router();
const userService = Container.get(UserService);

router.post('/', middlewares.userValidator, async (req, res) => {
  const data = req.body as UserInputDTO;

  const user = await userService.createUser(data);

  res.setHeader('Location', `${req.path}/${user.id}`);
  res.status(201).send(user);
});

router.get('/', async (req, res) => {
  const { loginSubstring = '', limit = 10 } = req.query;

  const list = await userService.getUsersList(loginSubstring, limit);

  res.send(list);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const user = await userService.getUserById(id);

  if (!user) {
    res.status(404).send('User does not exist');
  } else {
    res.send(user);
  }
});

router.put('/:id', middlewares.userValidator, async (req, res) => {
  const id = req.params.id;
  const data = req.body as UserInputDTO;

  const user = await userService.updateUserById(id, data);

  if (!user) {
    res.status(404).send('User does not exist');
  } else {
    res.send(user);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const deleted = await userService.deleteUserById(id);

  if (!deleted) {
    res.status(404).send('User does not exist');
  } else {
    res.status(204).send();
  }
});

export default router;
