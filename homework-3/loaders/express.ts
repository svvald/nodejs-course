import express from 'express';
import cors from 'cors';

import routes from '../api';

import { apiMethodLoggingMiddleware } from '../api/middlewares/loggers/api-method.logger';
import { genericErrorMiddleware } from '../api/middlewares/generic-error.middleware';
import { jwtMiddleware } from '../api/middlewares/jwt.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(apiMethodLoggingMiddleware);
app.use(jwtMiddleware);

app.use('/', routes.authRouter);
app.use('/users', routes.userRouter);
app.use('/groups', routes.groupRouter);

app.use(genericErrorMiddleware);

export default app;
