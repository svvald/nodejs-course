import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/user.service';
import { UserInputDTO } from '../interfaces/user.interface';

export class UserController {
  public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body as UserInputDTO;

    try {
      const user = await UserService.createUser(data);

      res.setHeader('Location', `${req.path}/${user.id}`);
      res.status(201).send(user);
    } catch (e) {
      return next(e);
    }
  }

  public static async getUsersList(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { loginSubstring = '', limit = 10 } = req.query;

    try {
      const list = await UserService.getUsersList(loginSubstring, limit);

      res.send(list);
    } catch (e) {
      return next(e);
    }
  }

  public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;

    try {
      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).send('User does not exist');
      } else {
        res.send(user);
      }
    } catch (e) {
      return next(e);
    }
  }

  public static async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const data = req.body as UserInputDTO;

    try {
      const user = await UserService.updateUserById(id, data);

      console.warn(user);

      if (!user) {
        res.status(404).send('User does not exist');
      } else {
        res.send(user);
      }
    } catch (e) {
      return next(e);
    }
  }

  public static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;

    try {
      const deleted = await UserService.deleteUserById(id);

      if (!deleted) {
        res.status(404).send('User does not exist');
      } else {
        res.status(204).send();
      }
    } catch (e) {
      return next(e);
    }
  }
}
