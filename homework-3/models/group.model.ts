import { Model, DataTypes } from 'sequelize';

import { Permission, Group } from '../interfaces/group.interface';
import sequelize from '../config/database';

export class GroupModel extends Model implements Group {
  public id!: number;
  public name!: string;
  public permissions!: Array<Permission>;
}

export default function (): void {
  GroupModel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
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
