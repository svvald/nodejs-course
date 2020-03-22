import { Model, DataTypes } from 'sequelize';

import { Permission, Group } from '../interfaces/group.interface';
import sequelize from '../config/database';

export class GroupModel extends Model implements Group {
  public id!: string;
  public name!: string;
  public permissions!: Array<Permission>;
}

export default function (): void {
  GroupModel.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'Groups',
  });
}
