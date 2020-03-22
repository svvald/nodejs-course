import { DataTypes, Model } from 'sequelize';

import { User } from '../interfaces/user.interface';
import sequelize from '../config/database';

export class UserModel extends Model implements User {
  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;
}

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
