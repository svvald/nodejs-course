import initUserModel from '../models/user.model';
import initGroupModel from '../models/group.model';
import initUserGroupModel from '../models/user-group.model';

export default function (): void {
  initUserModel();
  initGroupModel();
  initUserGroupModel();
}
