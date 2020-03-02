import { Service } from 'typedi';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { UserModel } from '../models/user.model';
import { User, UserInputDTO } from '../interfaces/user.interface';

@Service()
export class UserService {
  createUser(data: UserInputDTO): Promise<User> {
    const { login, password, age } = data;
    const id = uuidv4();
    return UserModel.create({ id, login, password, age });
  }

  getUsersList(loginSubstring: string, limit: number): Promise<User[]> {
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

  getUserById(id: string): Promise<User> {
    return UserModel.findByPk(id);
  }

  deleteUserById(id: string): Promise<number> {
    return UserModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    }).then(([numberOfUsers]: number[]) => numberOfUsers);
  }

  async updateUserById(id: string, data: UserInputDTO): Promise<User | undefined> {
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
