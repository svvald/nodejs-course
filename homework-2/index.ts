import express from 'express';
import { v4 } from 'uuid';

const app = express();

app.use(express.json());

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};
const users: Array<User> = [];

app.post('/users', (req, res) => {
  const user = req.body as User;

  user.id = v4();
  user.isDeleted = false;

  users.push(user);
  console.info(users);

  res.send(user);
});

app.get('/users', (req, res) => {
  const { loginSubstring = '', limit = 10 } = req.query;

  const list = users
    .filter(user => user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);

  res.send(list);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  let user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).send('User not found');
  }

  res.send(user);
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { login, password, age } = req.body as User;

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

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  let user = users.find(user => user.id === id);

  if (!user || user.isDeleted) {
    res.status(404).send('User is not found');
  } else {
    user.isDeleted = true;

    res.send(user);
  }
});

app.listen(3000, () => {
  console.log('Service is online');
});
