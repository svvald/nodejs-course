import { Group, Permission } from '../../interfaces/group.interface';
import { GroupModel } from '../../models/group.model';

const groups: Group[] = [{
  id:          'de7ba4bb-c541-43bd-ac71-9d0453c12b56',
  name:        'Admins',
  permissions: [Permission.READ, Permission.SHARE, Permission.WRITE, Permission.DELETE, Permission.UPLOAD_FILES],
}, {
  id:          '6dbd86a7-1110-499f-a2b3-1e756c49522c',
  name:        'Authors',
  permissions: [Permission.READ, Permission.SHARE, Permission.WRITE, Permission.UPLOAD_FILES],
}, {
  id:          '84b010ed-dcfc-4247-9bcd-94f1f3181d14',
  name:        'Users',
  permissions: [Permission.READ, Permission.SHARE],
}, {
  id:          '62a52184-2b45-4b99-bdae-8d4896071f6c',
  name:        'Read-Only Users',
  permissions: [Permission.READ],
}];

async function createGroupsTable(): Promise<void> {
  await GroupModel.sync({ force: true });
  await GroupModel.bulkCreate(groups);
}

export default createGroupsTable;
