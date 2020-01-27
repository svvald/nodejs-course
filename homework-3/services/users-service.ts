import {Service} from 'typedi';
import {Op} from 'sequelize';

import {UserModel} from '../models/user';
import {IUserInputDTO} from '../interfaces/user';

@Service()
export class UserService {
  constructor() {}

  async createUser(data: IUserInputDTO) {
    const { login, password, age } = data;
    return UserModel.create({login, password, age});
  }

  async getUsersList(loginSubstring: string, limit: number) {
    return UserModel.findAll({
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
    return UserModel.findByPk(id);
  }

  async deleteUserById(id: number) {
    return UserModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async updateUserById(id: number, data: IUserInputDTO) {
    const { login, password, age } = data;
    return UserModel.update({
      login, password, age,
    }, {
      where: {
        id,
        isDeleted: false,
      },
      returning: true,
    });
  }
}
