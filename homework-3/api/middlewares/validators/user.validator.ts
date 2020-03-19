import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

import { User } from '../../../interfaces/user.interface';

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().alphanum(),
  age: Joi.number().required().min(4).max(130),
});

const userValidator = (schema: Joi.ObjectSchema<User>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error?.isJoi) {
      res.status(400).json(error.message);
    } else {
      return next();
    }
  };
};

export default userValidator(userSchema);
