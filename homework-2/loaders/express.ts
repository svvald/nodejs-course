import express from 'express';

import routes from '../api';

export default function(app: express.Application) {
  app.use(express.json());
  app.use(routes());
};
