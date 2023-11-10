import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorMiddleware } from './middlewares';
import { userReducer } from './slices';
import { authApi, photosApi } from '../api';

const combinedReducer = combineReducers({
  userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [photosApi.reducerPath]: photosApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      photosApi.middleware,
      rtkQueryErrorMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
