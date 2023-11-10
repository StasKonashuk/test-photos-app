export const API_V1_ROUTE = `/api/v1`;

export const SWAGGER_ROUTE = `/docs`;

export const USERS_ROUTE = `${API_V1_ROUTE}/users`;

export const USERS_ROUTES = {
  SIGN_IN: `/login`,
  SIGN_UP: `/registration`,
  SIGN_OUT: `/logout`,
};

export const PHOTOS_ROUTE = `${API_V1_ROUTE}/photos`;

export const PHOTOS_ROUTES = {
  GET_PHOTOS: `/`,
  GET_PARTICULAR_PHOTO: `/:id`,
  POST_PHOTO_COMMENTS: `/:id/comments`,
  DELETE_PHOTO_COMMENTS: `/comments/:id`,
};

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum RESPONSE_CODE {
  VALIDATION_ERROR = 'validation_error',
  FORBIDEN_ERROR = 'forbiden_error',
}

export const jwtTimestamps = {
  accessExpiresIn: '60m',
};

export const DEFAULT_LIMIT = 100;
export const DEFAULT_OFFSET = 0;
