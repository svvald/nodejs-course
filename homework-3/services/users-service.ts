import { Service } from 'typedi';
import { Op } from 'sequelize';

import { UserModel } from '../models/user';
import { User, UserInputDTO } from '../interfaces/user';

@Service()
export class UserService {
  createUser(data: UserInputDTO): Promise<User> {
    const { login, password, age } = data;
    return UserModel.create({ login, password, age });
  }

  getUsersList(loginSubstring: string, limit: number): Promise<Array<User>> {
    return UserModel.findAll({
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring}%`,
        },
      },
      order: ['login'],
      limit,
    });
  }

  getUserById(id: number): Promise<User> {
    return UserModel.findByPk(id);
  }

  deleteUserById(id: number): Promise<[number, User]> {
    return UserModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  updateUserById(id: number, data: UserInputDTO): Promise<[number, User]> {
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
