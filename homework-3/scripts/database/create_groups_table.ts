import { Group, Permission } from '../../interfaces/group.interface';
import { GroupModel } from '../../models/group.model';

const groups: Group[] = [{
  id: 1,
  name: 'Admins',
  permissions: [Permission.READ, Permission.SHARE, Permission.WRITE, Permission.DELETE, Permission.UPLOAD_FILES],
}, {
  id: 2,
  name: 'Authors',
  permissions: [Permission.READ, Permission.SHARE, Permission.WRITE, Permission.UPLOAD_FILES],
}, {
  id: 3,
  name: 'Users',
  permissions: [Permission.READ, Permission.SHARE],
}, {
  id: 4,
  name: 'Read-Only Users',
  permissions: [Permission.READ],
}];

async function createGroupsTable(): Promise<void> {
  await GroupModel.sync({ force: true });
  await GroupModel.bulkCreate(groups);
}

export default createGroupsTable;
