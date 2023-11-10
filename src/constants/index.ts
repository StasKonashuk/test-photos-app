export * from './apiRoutes';
export * from './appRoutes';

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const STORE_TAGS = {
  USER: 'USER',
  PHOTOS: 'PHOTOS',
  PARTICULAR_PHOTO: 'PARTICULAR_PHOTO',
};

export type NavigateState = {
  from: Location;
};
