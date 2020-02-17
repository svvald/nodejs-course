import { Model, Sequelize, DataTypes } from 'sequelize';

import { Permission, Group } from '../interfaces/group';

export class GroupModel extends Model implements Group {
  public id!: number;
  public name!: string;
  public permissions!: Array<Permission>;
}

export default function (sequelize: Sequelize): void {
  GroupModel.init({
    id: {
      type: DataTypes.NUMBER,
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
    timestamps: false,
    tableName: 'groups',
  });
}
