import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { HTTP_CODE, DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants';
import { ResponseLocals } from '../../interfaces';
import photosService from './service';

const secret = process.env.JWT_ACCESS_SECRET_TOKEN as string;

class PhotosController {
  async getPhotos(req: Request, res: Response<unknown, ResponseLocals.AuthenticatedUser>) {
    try {
      const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = req.query;

      const result = await photosService.getPhotos({
        offset: Number(offset),
        limit: Number(limit),
      });

      res.json(result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getParticularPhoto(
    req: Request<{ id: string }>,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const result = await photosService.getParticularPhoto({ id });
      res.json(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async postPhotoComment(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const { text } = req.body;

      const authHeader = req.headers.authorization || '';

      const accessToken = authHeader?.split(' ')[1];

      const userInfo = jwt.verify(accessToken, secret) as Omit<User, 'password'>;

      const result = await photosService.postPhotoComment({
        text,
        photoId: id,
        createdById: userInfo.id,
      });

      res.status(HTTP_CODE.CREATED).json(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deletePhotoComment(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const authHeader = req.headers.authorization || '';

      const accessToken = authHeader?.split(' ')[1];

      const userInfo = jwt.verify(accessToken, secret) as Omit<User, 'password'>;

      const result = await photosService.deletePhotoComment({
        id,
        userId: userInfo.id,
      });

      res.status(HTTP_CODE.CREATED).json(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new PhotosController();
