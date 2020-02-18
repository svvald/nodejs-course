import { DataTypes, Model } from 'sequelize';

import { User } from '../interfaces/user.interface';
import sequelize from '../loaders/postgres';

export class UserModel extends Model implements User {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;
}

export default function (): void {
  UserModel.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
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
