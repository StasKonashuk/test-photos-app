import { Photo } from '@prisma/client';
import { Pagination } from '../../interfaces';
import { createError } from '../../utils';
import { dbContext } from '../../db/dbContext';

interface PostPhotoCommentBody {
  text: string;
  createdById: string;
  photoId: string;
}

interface DeletePhotoCommentBody {
  id: string;
  userId: string;
}

class PhotosService {
  private prisma = dbContext.getPrisma();

  async getPhotos({ limit, offset }: Pagination): Promise<{
    results: Photo[];
    metadata: { count: number; limit: number; offset: number };
  }> {
    const allPhotos = await this.prisma.photo.findMany({
      skip: offset,
      take: limit,
      include: {
        comments: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count = await this.prisma.photo.count();

    return {
      results: allPhotos,
      metadata: {
        count,
        limit,
        offset,
      },
    };
  }

  async getParticularPhoto(options: { id: string }): Promise<Photo | null> {
    const { id } = options;

    const particularPhoto = await this.prisma.photo.findFirst({
      where: { id },
      include: {
        comments: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!particularPhoto) {
      throw new createError.NotFound();
    }

    return particularPhoto;
  }

  async postPhotoComment(body: PostPhotoCommentBody): Promise<{ message: string } | void> {
    const { text, createdById, photoId } = body;
    try {
      const creator = await this.prisma.user.findFirst({
        where: {
          id: createdById,
        },
      });

      const photo = await this.prisma.photo.findFirst({
        where: {
          id: photoId,
        },
      });

      if (!creator || !photo) {
        throw new createError.NotFound();
      }

      await this.prisma.comment.create({
        data: {
          text,
          createdById,
          photoId,
        },
      });

      return { message: 'Comment has been created successfully' };
    } catch (err) {
      throw err;
    }
  }

  async deletePhotoComment(body: DeletePhotoCommentBody): Promise<{ message: string } | void> {
    const { id, userId } = body;

    try {
      const comment = await this.prisma.comment.findFirst({
        where: {
          id,
        },
      });

      if (!comment) {
        throw new createError.NotFound();
      }

      if (comment.createdById !== userId) {
        throw new createError.ForbiddenError();
      }

      await this.prisma.comment.delete({
        where: {
          id,
        },
      });

      return { message: 'Comment has been deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}

export default new PhotosService();
