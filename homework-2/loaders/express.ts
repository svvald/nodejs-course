import express from 'express';

import routes from '../api';

export default async function(app: express.Application) {
  app.use(express.json());
  app.use(routes());
};
