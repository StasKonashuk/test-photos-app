export const API_V1_ROUTE = `http://localhost:8000/api/v1`;

export const USERS_ROUTE = '/users';

export const USERS_ROUTES = {
  SIGN_IN: `${USERS_ROUTE}/login`,
  SIGN_UP: `${USERS_ROUTE}/registration`,
  SIGN_OUT: `${USERS_ROUTE}/logout`,
};

export const PHOTOS_ROUTE = '/photos';

export const PHOTOS_ROUTES = {
  GET_PHOTOS: `${PHOTOS_ROUTE}/`,
  GET_PARTICULAR_PHOTO: (id: string) => `${PHOTOS_ROUTE}/${id}`,
  POST_PHOTO_COMMENTS: (id: string) => `${PHOTOS_ROUTE}/${id}/comments`,
  DELETE_PHOTO_COMMENTS: (id: string) => `${PHOTOS_ROUTE}/comments/${id}`,
};
