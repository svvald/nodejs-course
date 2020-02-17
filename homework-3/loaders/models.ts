import { Sequelize } from 'sequelize';

import initUserModel from '../models/user';
import initGroupModel from '../models/group';

export default function (sequelize: Sequelize): void {
  initUserModel(sequelize);
  initGroupModel(sequelize);
}
