export interface PhotosData {
  id: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
  comments: {
    id: string;
    text: string;
    photoId: string;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    author: {
      id: string;
      email: string;
      name: string;
    };
  }[];
}

export interface ReceivedPhotosData {
  results: PhotosData[];
  metadata: {
    limit: number;
    offset: number;
    count: number;
  };
}

export interface GetParticularPhotoParams {
  id: string;
}

export interface PostPhotoCommentBody {
  photoId: string;
  text: string;
}

export interface DeletePhotoCommentParams {
  commentId: string;
}
