import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_V1_ROUTE } from '../constants';
import { RootState } from '../redux/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_V1_ROUTE,
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).userReducer;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
