import Joi from 'joi';
import { faker } from '@faker-js/faker';
import { EndpointSchema } from '../../interfaces';
import { buildResponse, schemaErrorExample } from '../../utils';
import { RESPONSE_CODE } from '../../constants';

const getPhotosSchema: EndpointSchema = {
  query: Joi.object({
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
  }).example({
    limit: faker.number,
    offset: faker.number,
  }),

  response: {
    200: {
      schema: Joi.object({
        results: Joi.array().items({
          id: Joi.string().uuid(),
          imgUrl: Joi.string(),
          createdAt: Joi.date(),
          updatedAt: Joi.date(),
          comments: Joi.array().items({
            id: Joi.string().uuid(),
            text: Joi.string(),
            photoId: Joi.string().uuid(),
            createdById: Joi.string().uuid(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            author: Joi.object({
              id: Joi.string().uuid(),
              email: Joi.string().email(),
              name: Joi.string(),
            }),
          }),
        }),
        metadata: {
          count: Joi.number().integer(),
          limit: Joi.number().integer(),
          offset: Joi.number().integer(),
        },
      }).example({
        results: [
          {
            id: faker.string.uuid(),
            imgUrl: faker.image.url(),
            createdAt: faker.date.future(),
            updatedAt: faker.date.future(),
            comments: [
              {
                id: faker.string.uuid(),
                text: faker.lorem.words(),
                photoId: faker.string.uuid(),
                createdById: faker.string.uuid(),
                createdAt: faker.date.future(),
                updatedAt: faker.date.future(),
                author: {
                  id: faker.string.uuid(),
                  email: faker.internet.email(),
                  name: faker.internet.userName(),
                },
              },
            ],
          },
        ],
        metadata: {
          count: faker.number.int(),
          limit: faker.number.int(),
          offset: faker.number.int(),
        },
      }),
      swaggerOptions: {
        description: 'Get all photos',
      },
    },

    401: buildResponse(schemaErrorExample.unauthenticatedError()),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const getParticularPhotoSchema: EndpointSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }).example({
    id: faker.string.uuid(),
  }),

  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        imgUrl: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        comments: Joi.array().items({
          id: Joi.string().uuid(),
          text: Joi.string(),
          photoId: Joi.string().uuid(),
          createdById: Joi.string().uuid(),
          createdAt: Joi.date(),
          updatedAt: Joi.date(),
          author: Joi.object({
            id: Joi.string().uuid(),
            email: Joi.string().email(),
            name: Joi.string(),
          }),
        }),
      }).example({
        id: faker.string.uuid(),
        imgUrl: faker.image.url(),
        createdAt: faker.date.future(),
        updatedAt: faker.date.future(),
        comments: [
          {
            id: faker.string.uuid(),
            text: faker.lorem.words(),
            photoId: faker.string.uuid(),
            createdById: faker.string.uuid(),
            createdAt: faker.date.future(),
            updatedAt: faker.date.future(),
            author: {
              id: faker.string.uuid(),
              email: faker.internet.email(),
              name: faker.internet.userName(),
            },
          },
        ],
      }),
      swaggerOptions: {
        description: 'Get particular photo',
      },
    },

    401: buildResponse(schemaErrorExample.unauthenticatedError()),
    404: buildResponse(schemaErrorExample.notFound()),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const postPhotoCommentSchema: EndpointSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }).example({
    id: faker.string.uuid(),
  }),

  body: Joi.object({
    text: Joi.string().required(),
  }).example({
    text: faker.lorem.words(),
  }),

  response: {
    201: {
      schema: Joi.object({
        message: Joi.string(),
      }).example({
        message: 'Comment has been created successfully',
      }),
      swaggerOptions: {
        description: 'Post photo comment',
      },
    },

    401: buildResponse(schemaErrorExample.unauthenticatedError()),
    404: buildResponse(schemaErrorExample.notFound()),
    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const deletePhotoCommentSchema: EndpointSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }).example({
    id: faker.string.uuid(),
  }),

  response: {
    201: {
      schema: Joi.object({
        message: Joi.string(),
      }).example({
        message: 'Comment has been deleted successfully',
      }),
      swaggerOptions: {
        description: 'Post photo comment',
      },
    },

    401: buildResponse(schemaErrorExample.unauthenticatedError()),
    404: buildResponse(schemaErrorExample.notFound()),
    403: buildResponse(schemaErrorExample.forbidenError(RESPONSE_CODE.FORBIDEN_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

export default {
  getPhotos: getPhotosSchema,
  getParticularPhoto: getParticularPhotoSchema,
  postPhotoComment: postPhotoCommentSchema,
  deletePhotoComment: deletePhotoCommentSchema,
};
