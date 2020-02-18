import { Model, DataTypes } from 'sequelize';

import { GroupModel } from './group.model';
import { UserModel } from './user.model';
import { UserGroup } from '../interfaces/user-group.interface';
import sequelize from '../loaders/postgres';

export class UserGroupModel extends Model implements UserGroup {
  id!: number;
  userId!: number;
  groupId!: number;
}

export default function (): void {
  UserGroupModel.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.NUMBER,
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
