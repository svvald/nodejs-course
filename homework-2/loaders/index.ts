import { Application } from 'express';

import expressLoader from './express';

export default function(app: Application) {
  expressLoader(app);
};
