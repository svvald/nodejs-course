import { v4 as uuidv4 } from 'uuid';

import { GroupInputDTO, Group } from '../interfaces/group.interface';
import { GroupModel } from '../models/group.model';
import { UserGroupModel } from '../models/user-group.model';
import sequelize from '../config/database';
import { UserModel } from '../models/user.model';
import { User } from '../interfaces/user.interface';
import { UserGroupInputDTO } from '../interfaces/user-group.interface';

export class GroupService {
  public static createGroup(data: GroupInputDTO): Promise<Group> {
    const { name, permissions } = data;
    const id = uuidv4();

    try {
      return GroupModel.create({ id, name, permissions });
    } catch (error) {
      throw new Error(error);
    }
  }

  public static getGroups(): Promise<Group[]> {
    try {
      return GroupModel.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  public static getGroupById(id: string): Promise<Group> {
    try {
      return GroupModel.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async updateGroupById(id: string, data: GroupInputDTO): Promise<Group | undefined> {
    const { name, permissions } = data;

    try {
      const group = await GroupModel.findByPk(id);

      if (!group) {
        return;
      }

      group.name = name;
      group.permissions = permissions;

      await group.save();

      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async deleteGroupById(id: string): Promise<number | undefined> {
    const transaction = await sequelize.transaction();

    try {
      const groups = await GroupModel.destroy({
        where: {
          id,
        },
        transaction
      });

      await transaction.commit();
      return groups;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  public static async addUsersToGroup(groupId: string, data: UserGroupInputDTO): Promise<User[] | undefined> {
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

      const relationId = uuidv4();
      const usersGroups = await UserGroupModel.bulkCreate(
        users.map((user: User) => {
          return {
            id: relationId,
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
      throw new Error(error);
    }
  }
}
