import { createApi } from '@reduxjs/toolkit/query/react';
import { USERS_ROUTES, STORE_TAGS } from '../constants';
import type { LoginRequest, UserCredentialData, RegistrationRequest } from './types';
import { setCredentials, logout } from '../redux/slices/user';
import { baseQuery } from './interceptor';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: [STORE_TAGS.USER],
  endpoints: (builder) => ({
    login: builder.mutation<UserCredentialData, LoginRequest>({
      query: (authenticationData) => ({
        url: USERS_ROUTES.SIGN_IN,
        method: 'POST',
        body: authenticationData,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setCredentials(data));
          }
        } catch (err) {
          console.error(err);
        }
      },

      invalidatesTags: [STORE_TAGS.USER],
    }),

    registration: builder.mutation<void, RegistrationRequest>({
      query: (credentials) => ({
        url: USERS_ROUTES.SIGN_UP,
        method: 'POST',
        body: credentials,
      }),

      invalidatesTags: [STORE_TAGS.USER],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: USERS_ROUTES.SIGN_OUT,
        method: 'GET',
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(logout());
      },

      invalidatesTags: [STORE_TAGS.USER],
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authApi;
