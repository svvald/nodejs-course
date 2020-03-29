import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class UserModel extends Model {}

export default function (): void {
  UserModel.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'Users',
  });
}
