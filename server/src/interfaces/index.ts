import Joi from 'joi';

export interface EndpointSchemaSwaggerOptions {
  description?: string;
}

export interface ResponseEndpointSchema {
  schema: Joi.Schema;
  swaggerOptions?: EndpointSchemaSwaggerOptions;
}

export interface EndpointSchema {
  params?: Joi.Schema;

  body?: Joi.Schema;

  query?: Joi.Schema;

  response: {
    [status: string]: ResponseEndpointSchema;
  };
}

export namespace ResponseLocals {
  export interface AuthenticatedUser {
    userId: number;
  }
}

export interface Pagination {
  limit: number;
  offset: number;
}
