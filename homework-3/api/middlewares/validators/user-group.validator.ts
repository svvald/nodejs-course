import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

import { UserGroupInputDTO } from '../../../interfaces/user-group.interface';

const userGroupSchema = Joi.object({
  userIds: Joi.array().unique().items(Joi.string()).required(),
});

const userGroupValidator = (schema: Joi.ObjectSchema<UserGroupInputDTO>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error?.isJoi) {
      res.status(400).json(error.message);
    } else {
      return next();
    }
  };
};

export default userGroupValidator(userGroupSchema);
