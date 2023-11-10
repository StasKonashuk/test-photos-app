import express from 'express';
import { USERS_ROUTES } from '../../constants/index';
import { schemaValidator } from '../../middlewares';
import controller from './controller';
import schema from './schema';

const router = express.Router();

router.post(USERS_ROUTES.SIGN_UP, schemaValidator(schema.registerUser), controller.registration);

router.post(USERS_ROUTES.SIGN_IN, schemaValidator(schema.loginUser), controller.login);

router.get(USERS_ROUTES.SIGN_OUT, controller.logout);

export default router;
