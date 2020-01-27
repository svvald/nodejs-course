import { Application } from 'express';

import postgresLoader from './postgres';
import expressLoader from './express';
import modelsLoader from './models';

export default async function(app: Application) {
  await postgresLoader();
  await modelsLoader();
  await expressLoader(app);
}
