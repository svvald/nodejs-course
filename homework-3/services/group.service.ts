import { Service } from 'typedi';

import { GroupInputDTO, Group } from '../interfaces/group.interface';
import { GroupModel } from '../models/group.model';
import { UserGroupModel } from '../models/user-group.model';
import sequelize from '../loaders/postgres';
import { UserModel } from '../models/user.model';
import { User } from '../interfaces/user.interface';
import { UserGroupInputDTO } from '../interfaces/user-group.interface';

@Service()
export class GroupsService {
  createGroup(data: GroupInputDTO): Promise<Group> {
    const { name, permissions } = data;
    return GroupModel.create({ name, permissions });
  }

  getGroups(): Promise<Group[]> {
    return GroupModel.findAll();
  }

  getGroupById(id: number): Promise<Group> {
    return GroupModel.findByPk(id);
  }

  async updateGroupById(id: number, data: GroupInputDTO): Promise<Group | undefined> {
    const { name, permissions } = data;

    const group = await GroupModel.findByPk(id);

    if (!group) {
      return;
    }

    group.name = name;
    group.permissions = permissions;

    await group.save();

    return group;
  }

  async deleteGroupById(id: number): Promise<number | undefined> {
    const transaction = await sequelize.transaction();

    try {
      const groups = await Promise.all([
        GroupModel.destroy({
          where: {
            id,
          },
          transaction,
        }),
        UserGroupModel.destroy({
          where: {
            groupId: id,
          },
          transaction,
        }),
      ]).then(([numberOfGroups]) => numberOfGroups);

      await transaction.commit();
      return groups;
    } catch (error) {
      await transaction.rollback();
    }
  }

  async addUsersToGroup(groupId: number, data: UserGroupInputDTO): Promise<User[] | undefined> {
    const { userIds } = data;

    const transaction = await sequelize.transaction();

    const group = await GroupModel.findByPk(groupId, { transaction });

    if (!group) {
      return;
    }

    try {
      const users = await UserModel.findAll({
        where: {
          id: userIds,
          isDeleted: false,
        },
        transaction,
      });

      const usersGroups = await UserGroupModel.bulkCreate(
        users.map((user: User) => {
          return {
            userId: user.id,
            groupId: group.id,
          };
        }), {
          transaction,
        });

      await transaction.commit();
      return usersGroups;
    } catch (error) {
      await transaction.rollback();
    }
  }
}
