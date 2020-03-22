import { Sequelize } from 'sequelize';

import config from './environment';

const sequelize = new Sequelize({
  dialect: 'postgres',

  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,

  define: {
    timestamps: false,
  },
});

export default sequelize;
