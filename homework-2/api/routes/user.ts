import { Router } from 'express';
import { v4 } from 'uuid';

import middlewares from '../middlewares';
import { IUser, IUserInputDTO } from '../../interfaces/user';

const route = Router();
const users: Array<IUser> = [];

export default (app: Router) => {
  app.use('/users', route);

  /* CRUD operations for Users */
  route.post('/', middlewares.userValidator, (req, res) => {
    const user: IUser = req.body;
  
    user.id = v4();
    user.isDeleted = false;
  
    users.push(user);
  
    res.setHeader('Location', `${req.path}/${user.id}`);
    res.status(201).send(user);
  });
  
  route.get('/', (req, res) => {
    const { loginSubstring = '', limit = 10 } = req.query;
  
    const list = users
      .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, limit);
  
    res.send(list);
  });
  
  route.get('/:id', (req, res) => {
    const id = req.params.id;
  
    let user = users.find(user => user.id === id);
  
    if (!user) {
      res.status(404).send('User not found');
    }
  
    res.send(user);
  });
  
  route.put('/:id', middlewares.userValidator, (req, res) => {
    const id = req.params.id;
    const { login, password, age } = req.body as IUserInputDTO;
  
    let user = users.find(user => user.id === id);
  
    if (!user) {
      res.status(404).send('User is not found');
    } else {
      user.login = login;
      user.password = password;
      user.age = age;
  
      res.send(user);
    }
  });
  
  route.delete('/:id', (req, res) => {
    const id = req.params.id;
    let user = users.find(user => user.id === id);
  
    if (!user || user.isDeleted) {
      res.status(404).send('User is not found');
    } else {
      user.isDeleted = true;
  
      res.status(204).send();
    }
  });
}
