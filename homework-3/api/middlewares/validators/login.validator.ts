import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().alphanum(),
});

const loginValidator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error?.isJoi) {
      res.status(400).json(error.message);
    } else {
      return next();
    }
  };
};

export default loginValidator(loginSchema);
