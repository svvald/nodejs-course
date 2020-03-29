import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ControllerLogger } from '../api/middlewares/loggers/controller.logger';
import { UserService } from '../services/user.service';
import environment from '../config/environment';

export class AuthController {
  @ControllerLogger()
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { login, password } = req.body;

    try {
      const user = await UserService.getUserByCredentials(login, password);

      if (!user) {
        res.status(400).send('Incorrect login and/or password have beed provided');
      } else {
        jwt.sign({ login, password }, environment.jwtSecret, (err: Error, token: string) => {
          if (err) {
            throw err;
          }

          res.status(200).send({ token });
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}
