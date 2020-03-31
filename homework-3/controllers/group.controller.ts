import { Request, Response, NextFunction } from 'express';

import { GroupService } from '../services/group.service';
import { ControllerLogger } from '../api/middlewares/loggers/controller.logger';

export class GroupController {
  @ControllerLogger()
  public static async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body;

    try {
      const group = await GroupService.createGroup(data);

      res.setHeader('Location', `${req.baseUrl}/${group.id}`);
      res.status(201).send(group);
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async getGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groups = await GroupService.getGroups();
      res.send(groups);
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async getGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;

    try {
      const group = await GroupService.getGroupById(id);

      if (!group) {
        res.status(404).send({ 'error': 'Group does not exist' });
      } else {
        res.send(group);
      }
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async updateGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const data = req.body;

    try {
      const group = await GroupService.updateGroupById(id, data);

      if (!group) {
        res.status(404).send({ 'error': 'Group does not exist' });
      } else {
        res.send(group);
      }
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async deleteGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;

    try {
      const deleted = await GroupService.deleteGroupById(id);

      if (!deleted) {
        res.status(404).send({ 'error': 'Group does not exist' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async addUsersToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const data = req.body;

    try {
      const users = await GroupService.addUsersToGroup(id, data);

      if (!users) {
        res.status(404).send({ 'error': 'Group does not exist' });
      } else {
        res.status(201).send();
      }
    } catch (error) {
      return next(error);
    }
  }
}
