import { Model, DataTypes } from 'sequelize';

import { GroupModel } from './group.model';
import { UserModel } from './user.model';
import { UserGroup } from '../interfaces/user-group.interface';
import sequelize from '../config/database';

export class UserGroupModel extends Model implements UserGroup {
  id!: string;
  userId!: string;
  groupId!: string;
}

export default function (): void {
  UserGroupModel.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.UUID,
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
