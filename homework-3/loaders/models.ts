import { Sequelize } from 'sequelize';

import initUserModel from '../models/user';

export default async function (sequelize: Sequelize) {
  await initUserModel(sequelize);
}
