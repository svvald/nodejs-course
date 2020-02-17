import { Service } from 'typedi';

import { GroupInputDTO, Group } from '../interfaces/group';
import { GroupModel } from '../models/group';

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

  deleteGroupById(id: number): Promise<number> {
    return GroupModel.destroy({
      where: {
        id,
      },
    });
  }
}
