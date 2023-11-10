import { createApi } from '@reduxjs/toolkit/query/react';
import { PHOTOS_ROUTES, STORE_TAGS } from '../constants';
import { baseQuery } from './interceptor';
import {
  ReceivedPhotosData,
  PhotosData,
  GetParticularPhotoParams,
  MessageResponse,
  PostPhotoCommentBody,
  DeletePhotoCommentParams,
} from './types';

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery,
  tagTypes: [STORE_TAGS.PHOTOS],
  endpoints: (builder) => ({
    getPhotos: builder.query<ReceivedPhotosData, {}>({
      query: () => ({
        url: PHOTOS_ROUTES.GET_PHOTOS,
        method: 'GET',
      }),
      providesTags: [STORE_TAGS.PHOTOS],
    }),

    getParticularPhoto: builder.query<PhotosData, GetParticularPhotoParams>({
      query: ({ id }) => ({
        url: PHOTOS_ROUTES.GET_PARTICULAR_PHOTO(id),
        method: 'GET',
      }),
      providesTags: [STORE_TAGS.PARTICULAR_PHOTO],
    }),

    postPhotoComment: builder.mutation<MessageResponse, PostPhotoCommentBody>({
      query: (body) => ({
        url: PHOTOS_ROUTES.POST_PHOTO_COMMENTS(body.photoId),
        method: 'POST',
        body: { text: body.text },
      }),
      invalidatesTags: [STORE_TAGS.PHOTOS, STORE_TAGS.PARTICULAR_PHOTO],
    }),

    deletePhotoComment: builder.mutation<MessageResponse, DeletePhotoCommentParams>({
      query: (body) => ({
        url: PHOTOS_ROUTES.DELETE_PHOTO_COMMENTS(body.commentId),
        method: 'DELETE',
      }),
      invalidatesTags: [STORE_TAGS.PHOTOS, STORE_TAGS.PARTICULAR_PHOTO],
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useLazyGetParticularPhotoQuery,
  usePostPhotoCommentMutation,
  useDeletePhotoCommentMutation,
} = photosApi;
