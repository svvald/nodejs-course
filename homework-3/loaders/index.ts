import { Application } from 'express';

import sequelize from './postgres';
import expressLoader from './express';
import modelsLoader from './models';

export default async function (app: Application): Promise<void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }

  modelsLoader();
  expressLoader(app);
}
