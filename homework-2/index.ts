import 'reflect-metadata';

import express from 'express';

import initLoaders from './loaders';
import config from './config';

async function startServer() {
  const app = express();

  await initLoaders(app);

  app.listen(config.port, () => {
    console.log(`Server is ready and listening on port ${config.port}`);
  });
};

startServer();
