import express from 'express';

import initLoaders from './loaders';

function startServer() {
  const app = express();

  initLoaders(app);

  app.listen(3000, () => {
    console.log(`Server is ready and listening on port 3000`);
  });
};

startServer();
