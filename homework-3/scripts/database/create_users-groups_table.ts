import { UserGroup } from '../../interfaces/user-group.interface';
import { UserGroupModel } from '../../models/user-group.model';

const groups: UserGroup[] = [{
  id: 1,
  userId: 1,
  groupId: 1,
}, {
  id: 2,
  userId: 1,
  groupId: 2,
}, {
  id: 3,
  userId: 2,
  groupId: 4,
}, {
  id: 4,
  userId: 3,
  groupId: 4,
}, {
  id: 5,
  userId: 4,
  groupId: 3,
}, {
  id: 6,
  userId: 5,
  groupId: 2
}, {
  id: 7,
  userId: 6,
  groupId: 1,
}];

async function createUsersGroupsTable(): Promise<void> {
  await UserGroupModel.sync({ force: true });
  await UserGroupModel.bulkCreate(groups);
}

export default createUsersGroupsTable;
