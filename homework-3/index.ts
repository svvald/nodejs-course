import 'reflect-metadata';

import express from 'express';

import initLoaders from './loaders';
import config from './config/environment';

async function startServer(): Promise<void> {
  const app = express();

  await initLoaders(app);

  app.listen(config.app.port, () => {
    console.log(`Server is ready and listening on port ${config.app.port}`);
  });
}

startServer();
