import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { UserModel } from '../models/user.model';
import { User, UserInputDTO } from '../interfaces/user.interface';

export class UserService {
  public static createUser(data: UserInputDTO): Promise<User> {
    const { login, password, age } = data;
    const id = uuidv4();

    try {
      return UserModel.create({ id, login, password, age });
    } catch (error) {
      throw new Error(error);
    }
  }

  public static getUsersList(loginSubstring: string, limit: number): Promise<User[]> {
    try {
      return UserModel.findAll({
        where: {
          login: {
            [Op.iLike]: `%${loginSubstring}%`,
          },
        },
        order: ['login'],
        limit,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public static getUserById(id: string): Promise<User> {
    try {
      return UserModel.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  public static getUserByCredentials(login: string, password: string): Promise<User> {
    try {
      return UserModel.findOne({
        where: {
          login,
          password,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async deleteUserById(id: string): Promise<number> {
    try {
      const [numberOfUpdatedRows] = await UserModel.update({
        isDeleted: true,
      }, {
        where: {
          id,
          isDeleted: false,
        },
      });

      return numberOfUpdatedRows;
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async updateUserById(id: string, data: UserInputDTO): Promise<User | undefined> {
    const { login, password, age } = data;

    try {
      const user = await UserModel.findByPk(id);

      if (!user) {
        return;
      }

      user.login = login;
      user.password = password;
      user.age = age;

      await user.save();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
