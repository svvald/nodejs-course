import express from 'express';

import routes from '../api';

export default function (app: express.Application): void {
  app.use(express.json());
  app.use('/users', routes.userRouter);
}
