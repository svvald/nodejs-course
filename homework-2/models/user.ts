import { Container } from 'typedi';
import { Sequelize, DataTypes } from 'sequelize';

import Constants from '../constants';

export default async function () {
  const sequelize = Container.get(Constants.DI_TOKENS.SEQUELIZE) as Sequelize;

  const UserModel = sequelize.define('userModel', {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
    age: DataTypes.NUMBER,
    isDeleted: DataTypes.BOOLEAN
  });

  Container.set('userModel', UserModel);
}
