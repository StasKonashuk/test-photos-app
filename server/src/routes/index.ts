import express from 'express';
import swaggerUI from 'swagger-ui-express';
import users from './users';
import photos from './photos';
import serverStatus from './serverStatus';
import swDocument from '../../swagger.def';
import { globalErrorHandler } from '../middlewares/globalErrorHandler';
import { PHOTOS_ROUTE, SWAGGER_ROUTE, USERS_ROUTE } from '../constants';

export default (app: express.Application) => {
  app.use(USERS_ROUTE, users);
  app.use(PHOTOS_ROUTE, photos);
  app.use(SWAGGER_ROUTE, swaggerUI.serve, swaggerUI.setup(swDocument));
  app.use('/', serverStatus);
  app.use(globalErrorHandler);
};
