import { Router } from 'express';

import user from './routes/user';

export default function() {
  const app = Router();

  user(app);

  return app;
};
