import { Model, DataTypes } from 'sequelize';

import { GroupModel } from './group.model';
import { UserModel } from './user.model';
import { UserGroup } from '../interfaces/user-group.interface';
import sequelize from '../config/database';

export class UserGroupModel extends Model implements UserGroup {
  id!: number;
  userId!: number;
  groupId!: number;
}

export default function (): void {
  UserGroupModel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'UsersGroups',
  });

  UserModel.belongsToMany(GroupModel, {
    through: 'UsersGroups',
    foreignKey: 'userId',
  });

  GroupModel.belongsToMany(UserModel, {
    through: 'UsersGroups',
    foreignKey: 'groupId',
  });
}
