import { User } from '../../interfaces/user.interface';
import { UserModel } from '../../models/user.model';

const users: User[] = [{
  id: 1,
  login: 'Ivan',
  password: 'qwerty',
  age: 18,
  isDeleted: false,
}, {
  id: 2,
  login: 'Peter',
  password: '1q2w3e4r',
  age: 50,
  isDeleted: false,
}, {
  id: 3,
  login: 'Alex',
  password: 'asdfgh',
  age: 14,
  isDeleted: false,
}, {
  id: 4,
  login: 'Kolya',
  password: 'qawsedrf',
  age: 36,
  isDeleted: false,
}, {
  id: 5,
  login: 'Swald',
  password: 'zxcv1996',
  age: 24,
  isDeleted: true,
}, {
  id: 6,
  login: 'Björn',
  password: 'sverige',
  age: 22,
  isDeleted: false,
}, {
  id: 7,
  login: 'Johan',
  password: 'pdxinteractive',
  age: 12,
  isDeleted: false,
}, {
  id: 8,
  login: 'Franklin',
  password: 'grovest',
  age: 28,
  isDeleted: false,
}, {
  id: 9,
  login: 'Michael',
  password: 'lester',
  age: 46,
  isDeleted: false,
}, {
  id: 10,
  login: 'Trevor',
  password: 'brian',
  age: 45,
  isDeleted: true,
}];

async function createUsersTable(): Promise<void> {
  await UserModel.sync({ force: true });
  await UserModel.bulkCreate(users);
}

export default createUsersTable;
