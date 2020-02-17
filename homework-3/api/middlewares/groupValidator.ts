import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

import { Group } from '../../interfaces/group';

const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().unique().min(1).max(5).items(
    Joi.string().valid('READ'),
    Joi.string().valid('WRITE'),
    Joi.string().valid('DELETE'),
    Joi.string().valid('SHARE'),
    Joi.string().valid('UPLOAD_FILES'),
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
