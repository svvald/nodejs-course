import express from 'express';

import routes from '../api';

import { apiMethodLoggingMiddleware } from '../api/middlewares/loggers/api-method.logger';
import { genericErrorMiddleware } from '../api/middlewares/generic-error.middleware';

export default function (app: express.Application): void {
  app.use(express.json());

  app.use(apiMethodLoggingMiddleware);

  app.use('/users', routes.userRouter);
  app.use('/groups', routes.groupRouter);

  app.use(genericErrorMiddleware);
}
