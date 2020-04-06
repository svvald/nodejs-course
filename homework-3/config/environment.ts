import dotenv from 'dotenv';

const env = dotenv.config();
if (env.error) {
  throw new Error(env.error.message);
}

export default {
  app: {
    port: parseInt(process.env.APP_PORT as string, 10),
  },

  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },

  jwtSecret: process.env.JWT_SECRET || (Math.random() * 1000000).toString(),
};
