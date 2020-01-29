import { Service } from 'typedi';
import { Op } from 'sequelize';

import { UserModel } from '../models/user';
import { IUser, IUserInputDTO } from '../interfaces/user';

@Service()
export class UserService {
  createUser(data: IUserInputDTO): Promise<IUser> {
    const { login, password, age } = data;
    return UserModel.create({ login, password, age });
  }

  getUsersList(loginSubstring: string, limit: number): Promise<Array<IUser>> {
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

  getUserById(id: number): Promise<IUser> {
    return UserModel.findByPk(id);
  }

  deleteUserById(id: number): Promise<[number, IUser]> {
    return UserModel.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  updateUserById(id: number, data: IUserInputDTO): Promise<[number, IUser]> {
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
