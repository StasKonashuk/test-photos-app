import { HttpMethods, swaggerObjectBuilder } from '../../utils';
import { PHOTOS_ROUTES, PHOTOS_ROUTE } from '../../constants';
import { swaggerBuilder } from '../../utils/swaggerBuilder';
import schemas from './schema';

const getPhotos = {
  method: HttpMethods.GET,
  path: PHOTOS_ROUTES.GET_PHOTOS,
  summary: 'Get photos',
  tags: ['photos'],
  parameters: swaggerBuilder.query(schemas.getPhotos),
  responses: swaggerBuilder.response(schemas.getPhotos),
};

const getParticularPhoto = {
  method: HttpMethods.GET,
  path: PHOTOS_ROUTES.GET_PARTICULAR_PHOTO,
  summary: 'Get particular photo',
  tags: ['photos'],
  parameters: swaggerBuilder.path(schemas.getParticularPhoto),
  responses: swaggerBuilder.response(schemas.getParticularPhoto),
};

const postPhotoComment = {
  method: HttpMethods.POST,
  path: PHOTOS_ROUTES.POST_PHOTO_COMMENTS,
  summary: 'Post photo comment',
  tags: ['photos'],
  parameters: swaggerBuilder.path(schemas.postPhotoComment),
  requestBody: swaggerBuilder.body(schemas.postPhotoComment),
  responses: swaggerBuilder.response(schemas.postPhotoComment),
};

const deletePhotoComment = {
  method: HttpMethods.DELETE,
  path: PHOTOS_ROUTES.DELETE_PHOTO_COMMENTS,
  summary: 'Delete photo comment',
  tags: ['photos'],
  parameters: swaggerBuilder.path(schemas.deletePhotoComment),
  responses: swaggerBuilder.response(schemas.deletePhotoComment),
};

export default swaggerObjectBuilder(
  PHOTOS_ROUTE,
  getPhotos,
  getParticularPhoto,
  postPhotoComment,
  deletePhotoComment,
);
