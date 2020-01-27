import { Sequelize } from 'sequelize';

import config from '../config';

export default async function() {
  const sequelizeInstance = new Sequelize({
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    username: config.database.user,
    password: config.database.password,
    dialect: 'postgres',
  });

  try {
    await sequelizeInstance.authenticate();
    return sequelizeInstance;
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
}
