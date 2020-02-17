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

  deleteUserById(id: number): Promise<[number, number]> {
    return UserModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async updateUserById(id: number, data: UserInputDTO): Promise<User | undefined> {
    const { login, password, age } = data;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return;
    }

    user.login = login;
    user.password = password;
    user.age = age;

    await user.save();

    return user;
  }
}
