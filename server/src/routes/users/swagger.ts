import { HttpMethods, swaggerObjectBuilder } from '../../utils';
import { USERS_ROUTES, USERS_ROUTE } from '../../constants';
import { swaggerBuilder } from '../../utils/swaggerBuilder';
import schemas from './schema';

const loginUser = {
  method: HttpMethods.POST,
  path: USERS_ROUTES.SIGN_IN,
  summary: 'Login user',
  tags: ['users'],
  requestBody: swaggerBuilder.body(schemas.loginUser),
  responses: swaggerBuilder.response(schemas.loginUser),
};

const registerUser = {
  method: HttpMethods.POST,
  path: USERS_ROUTES.SIGN_UP,
  summary: 'Register user',
  tags: ['users'],
  requestBody: swaggerBuilder.body(schemas.registerUser),
  responses: swaggerBuilder.response(schemas.registerUser),
};

const logoutUser = {
  method: HttpMethods.GET,
  path: USERS_ROUTES.SIGN_OUT,
  summary: 'Logout user',
  tags: ['users'],
  responses: swaggerBuilder.response(schemas.logoutUser),
};

export default swaggerObjectBuilder(USERS_ROUTE, loginUser, registerUser, logoutUser);
