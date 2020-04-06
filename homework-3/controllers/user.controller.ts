import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/user.service';
import { UserInputDTO } from '../interfaces/user.interface';
import { ControllerLogger } from '../api/middlewares/loggers/controller.logger';

export class UserController {
  @ControllerLogger()
  public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body as UserInputDTO;

    try {
      const user = await UserService.createUser(data);

      res.setHeader('Location', `${req.baseUrl}/${user.id}`);
      res.status(201).send(user);
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async getUsersList(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { loginSubstring = '', limit = 10 } = req.query;

    try {
      const list = await UserService.getUsersList(loginSubstring, limit);

      res.send(list);
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;

    try {
      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).json({ 'error': 'User does not exist' });
      } else {
        res.send(user);
      }
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const data = req.body as UserInputDTO;

    try {
      const user = await UserService.updateUserById(id, data);

      if (!user) {
        res.status(404).json({ 'error': 'User does not exist' });
      } else {
        res.send(user);
      }
    } catch (error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;

    try {
      const deleted = await UserService.deleteUserById(id);

      if (!deleted) {
        res.status(404).json({ 'error': 'User does not exist' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      return next(error);
    }
  }
}
