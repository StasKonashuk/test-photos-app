import express from 'express';
import { PHOTOS_ROUTES } from '../../constants';
import { schemaValidator, authMiddleware } from '../../middlewares';
import controller from './controller';
import schema from './schema';

const router = express.Router();

router.get(
  PHOTOS_ROUTES.GET_PHOTOS,
  authMiddleware,
  schemaValidator(schema.getPhotos),
  controller.getPhotos,
);

router.get(
  PHOTOS_ROUTES.GET_PARTICULAR_PHOTO,
  authMiddleware,
  schemaValidator(schema.getParticularPhoto),
  controller.getParticularPhoto,
);

router.post(
  PHOTOS_ROUTES.POST_PHOTO_COMMENTS,
  authMiddleware,
  schemaValidator(schema.postPhotoComment),
  controller.postPhotoComment,
);

router.delete(
  PHOTOS_ROUTES.DELETE_PHOTO_COMMENTS,
  authMiddleware,
  schemaValidator(schema.deletePhotoComment),
  controller.deletePhotoComment,
);

export default router;
