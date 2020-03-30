import initEnvironment from './loaders';
import config from './config/environment';
import server from './loaders/express';

async function startServer(): Promise<void> {
  await initEnvironment();

  server.listen(config.app.port, () => {
    console.log(`Server is ready and listening on port ${config.app.port}`);
  });
}

startServer();
