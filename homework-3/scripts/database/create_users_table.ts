import { User } from '../../interfaces/user.interface';
import { UserModel } from '../../models/user.model';

const users: User[] = [{
  id:       '3b8c667c-5c6f-4b29-a2f6-9c4d8a10f33b',
  login:    'Ivan',
  password: 'qwerty',
  age:       18,
  isDeleted: false,
}, {
  id:       '3f587f87-3ae4-4400-b08d-503a3ccd1630',
  login:    'Peter',
  password: '1q2w3e4r',
  age:       50,
  isDeleted: false,
}, {
  id:       '5c1c53e4-126f-4eeb-a4f3-ce156d1fb467',
  login:    'Alex',
  password: 'asdfgh',
  age:       14,
  isDeleted: false,
}, {
  id:       '8631fa18-b9ea-4d1e-bc2c-531ccfcc9863',
  login:    'Kolya',
  password: 'qawsedrf',
  age:       36,
  isDeleted: false,
}, {
  id:       'f1291ada-9739-45b4-9ea4-5a90aad490cb',
  login:    'Swald',
  password: 'zxcv1996',
  age:       24,
  isDeleted: true,
}, {
  id:       '92c3be40-2c8f-4771-80f6-e9235e3b5af0',
  login:    'Björn',
  password: 'sverige',
  age:       22,
  isDeleted: false,
}, {
  id:       'b27f38af-d3fa-4010-873b-9b3c1139f815',
  login:    'Johan',
  password: 'pdxinteractive',
  age:       12,
  isDeleted: false,
}, {
  id:       '61b2c570-0138-4b7f-a3b2-49944f632aea',
  login:    'Franklin',
  password: 'grovest',
  age:       28,
  isDeleted: false,
}, {
  id:       'f30657fb-20cd-42c3-a8e0-cdcca346105a',
  login:    'Michael',
  password: 'lester',
  age:       46,
  isDeleted: false,
}, {
  id:       'f0b4efd4-79d6-4e32-8b99-ca1a8dd718e3',
  login:    'Trevor',
  password: 'brian',
  age:       45,
  isDeleted: true,
}];

async function createUsersTable(): Promise<void> {
  await UserModel.sync({ force: true });
  await UserModel.bulkCreate(users);
}

export default createUsersTable;
