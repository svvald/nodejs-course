import { Service } from 'typedi';
import { Op } from 'sequelize';

import { UserModel } from '../models/user';
import { IUserInputDTO } from '../interfaces/user';

@Service()
export class UserService {
  constructor() {}

  async createUser(data: IUserInputDTO) {
    const { login, password, age } = data;
    const user = await UserModel.create({ login, password, age });
    return user;
  }

  async getUsersList(loginSubstring: string, limit: number) {
    return await UserModel.findAll({
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring}%`,
        }
      },
      order: ['login'],
      limit,
    });
  }

  async getUserById(id: number) {
    return await UserModel.findByPk(id);
  }

  async deleteUserById(id: number) {
    const affectedRows = await UserModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    });
    return affectedRows;
  }

  async updateUserById(id: number, data: IUserInputDTO) {
    const { login, password, age } = data;
    const affectedRows = await UserModel.update({
      login, password, age,
    }, {
      where: {
        id,
        isDeleted: false,
      },
      returning: true,
    });
    return affectedRows;
  }
}
