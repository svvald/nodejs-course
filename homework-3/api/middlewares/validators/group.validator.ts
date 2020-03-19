import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

import { Group, Permission } from '../../../interfaces/group.interface';

const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().unique().min(1).max(5).items(
    Joi.string().valid(Permission.READ),
    Joi.string().valid(Permission.WRITE),
    Joi.string().valid(Permission.DELETE),
    Joi.string().valid(Permission.SHARE),
    Joi.string().valid(Permission.UPLOAD_FILES),
  ).required(),
});

const groupValidator = (schema: Joi.ObjectSchema<Group>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error?.isJoi) {
      res.status(400).json(error.message);
    } else {
      return next();
    }
  };
};

export default groupValidator(groupSchema);
