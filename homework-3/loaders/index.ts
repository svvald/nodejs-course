import sequelize from '../config/database';
import modelsLoader from './models';

import { genericErrorLogger } from '../api/middlewares/loggers/generic-error.logger';

export default async function (): Promise<void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }

  modelsLoader();

  process.on('uncaughtException', error => {
    const message = `${error.name} ${error.message}, ${error.stack}`;
    genericErrorLogger.error(message);
  });

  process.on('unhandledRejection', () => {
    const message = 'Unhandled rejection was detected within the application';
    genericErrorLogger.error(message);
  });
}
