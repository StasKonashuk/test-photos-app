import Joi from 'joi';
import { faker } from '@faker-js/faker';
import { RESPONSE_CODE } from '../../constants';
import { EndpointSchema } from '../../interfaces';
import { buildResponse, schemaErrorExample } from '../../utils';

const loginUserSchema: EndpointSchema = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).example({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }),

  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        email: Joi.string().email(),
        name: Joi.string(),
        tokenData: Joi.object({
          accessToken: Joi.string(),
        }),
      }).example({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        tokenData: {
          accessToken: faker.string.uuid(),
        },
      }),
      swaggerOptions: {
        description: 'Login',
      },
    },
    404: buildResponse(schemaErrorExample.notFound()),
    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const registrationSchema: EndpointSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }).example({
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
  }),

  response: {
    201: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        email: Joi.string().email(),
        name: Joi.string(),
        tokenData: Joi.object({
          accessToken: Joi.string(),
        }),
      }).example({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        tokenData: {
          accessToken: faker.string.uuid(),
        },
      }),
      swaggerOptions: {
        description: 'Registration',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const logoutUserSchema: EndpointSchema = {
  response: {
    200: {
      schema: Joi.object({}).allow(null),
      swaggerOptions: {
        description: 'Logout user',
      },
    },

    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

export default {
  loginUser: loginUserSchema,
  registerUser: registrationSchema,
  logoutUser: logoutUserSchema,
};
