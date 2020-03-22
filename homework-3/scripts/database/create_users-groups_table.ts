import { UserGroup } from '../../interfaces/user-group.interface';
import { UserGroupModel } from '../../models/user-group.model';

const groups: UserGroup[] = [{
  id:      '1fb6d027-57be-4ab9-99bd-4f94ce7e0534',
  userId:  '3b8c667c-5c6f-4b29-a2f6-9c4d8a10f33b',
  groupId: 'de7ba4bb-c541-43bd-ac71-9d0453c12b56',
}, {
  id:      'ba4aef17-3efc-4873-b6fa-590566c997be',
  userId:  '3b8c667c-5c6f-4b29-a2f6-9c4d8a10f33b',
  groupId: '6dbd86a7-1110-499f-a2b3-1e756c49522c',
}, {
  id:      '5c7a5b04-1eff-4621-9383-7a9545976051',
  userId:  '3f587f87-3ae4-4400-b08d-503a3ccd1630',
  groupId: '62a52184-2b45-4b99-bdae-8d4896071f6c',
}, {
  id:      '52b7b8a0-0c89-4d8f-81e9-7ca511650d1b',
  userId:  '5c1c53e4-126f-4eeb-a4f3-ce156d1fb467',
  groupId: '62a52184-2b45-4b99-bdae-8d4896071f6c',
}, {
  id:      '2f5e3e45-df23-441d-b4f7-3da2f67b3d8d',
  userId:  '8631fa18-b9ea-4d1e-bc2c-531ccfcc9863',
  groupId: '84b010ed-dcfc-4247-9bcd-94f1f3181d14',
}, {
  id:      '1062dd1d-1ae7-45a4-a40e-0d5d79f8d442',
  userId:  'f1291ada-9739-45b4-9ea4-5a90aad490cb',
  groupId: '6dbd86a7-1110-499f-a2b3-1e756c49522c',
}, {
  id:      'ad70432f-553e-49f1-b3d1-0923df1b517a',
  userId:  '92c3be40-2c8f-4771-80f6-e9235e3b5af0',
  groupId: 'de7ba4bb-c541-43bd-ac71-9d0453c12b56',
}];

async function createUsersGroupsTable(): Promise<void> {
  await UserGroupModel.sync({ force: true });
  await UserGroupModel.bulkCreate(groups);
}

export default createUsersGroupsTable;
